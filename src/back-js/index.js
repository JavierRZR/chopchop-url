import dotenv from 'dotenv';
import express from "express";
import session from "express-session";
// import session from "cookie-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import { Strategy as GithubStrategy } from "passport-github";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { connectToDb, getDb } from "./db.js";
import { validateEasyLink, validateComplexLink } from "./validation.js";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const app = express(); // Create an instance of Express
app.use(express.json());
const corsOptions = {
  origin: process.env.FRONT_URL, // Allow requests from your frontend origin
  credentials: true, // Allow credentials (cookies, authorization headers)
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.enable("trust proxy", 1);
app.set("trust proxy", 1);

// app.use(
//   session({
//     name: 'session',
//     keys: [process.env.SESSION_SECRET_KEY],
//     maxAge: 24 * 60 * 60 * 1000, // 24 hours
//     cookie: { secure: true },
//     secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
//   })
// );
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      // domain: "chopchop-url.vercel.app",
    },
  })
);

const enforceHTTPS = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
};
app.use(enforceHTTPS);

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle GitHub OAuth callback
      // Add your user authentication logic here
      return done(null, profile);
    },
  ),
);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you can handle user profile data
      return done(null, profile);
    }
  )
);

// Custom middleware to generate JWT token and store it in a session cookie
const generateTokenMiddleware = (req, res, next) => {
  const reqUser = req.user;
  const returned = {
    id: reqUser?.id,
    username: reqUser?.username,
    name: reqUser?.displayName,
    avatarUrl: reqUser?.photos[0]?.value || null,
  };
  const token = jwt.sign(reqUser, process.env.JWT_SECRET_KEY, {
    expiresIn: "5h",
  });
  console.log("TOKEN222: " + token);
  req.session.token = token; // Store token in session
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 100 * 60 * 60 * 48,
    sameSite: 'none',
    // domain: "chopchop-url.vercel.app",
    // withCredentials: true
  });
  console.log('Cookie set:', res.getHeader('Set-Cookie'));
  next();
};

//AUTH ROUTES ------------------------------------------
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  generateTokenMiddleware,
  (req, res) => {
    console.log("hemos llegado ya?");
    res.redirect(process.env.FRONT_URL);
  },
);
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  generateTokenMiddleware,
  (req, res) => {
    // Successful authentication, redirect to home.
    res.redirect(process.env.FRONT_URL);
  }
);


// Route to handle user data retrieval based on token
app.get("/user", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONT_URL); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, authorization headers)
  const token = String(req.cookies.token);
  console.log("TOKEN: " + req.cookies.token);
  console.log("sessionToken: " + req.session.token);
  console.log("Ricardo: " + token);

  const token2 = req.headers.cookie;
  console.log("token 2" + token2);


  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Token is valid, extract user information from decoded token
    const userData = decoded;

    const returned = {
      id: userData?.id,
      username: userData?.username,
      name: userData?.displayName,
      avatarUrl: userData?.photos[0]?.value || null,
    };

    res.status(200).json(returned);
  });
});

app.get("/logout", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONT_URL); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, authorization headers)

  // Clear the cookie by setting its expiration date to the past
  res.cookie("token", "", { expires: new Date(0) });

  // Redirect the user or send a response as needed
  // res.redirect("/");
  res.status(200).json({ ok: true });
});

//LINKS ROUTES ------------------------------------------
let db;
connectToDb((err) => {
  if (err) return;
  db = getDb();
});
app.post("/createBasicLink", (req, res) => {
  var validation = validateEasyLink(req.body);
  if (!validation.result) {
    res.status(400).json({
      code: validation.code,
      message:
        "A correct url has not been sent. Please try again after checking your URL.",
    });
  }
  const link = req.body;

  function searchLink() {
    //If userId check if link already exist for this user. In that case return error and status.
    link.userId &&
      db
        .collection("links")
        .findOne({ toUrl: link.toUrl, userId: link.userId })
        .then((response) => {
          if (response) {
            res.status(409).json({
              code: "CE-0001",
              message: "You already has this url chopped.",
            });
          } else {
            createLink();
          }
        });

    !link.userId && createLink();
  }

  function createLink() {
    const newLink = {
      userId: link?.userId || null,
      fromUrl: uuidv4(),
      toUrl: link.toUrl,
      numClicks: 0,
      maxNumClicks: null,
      password: null,
      description: null,
    };

    db.collection("links")
      .insertOne(newLink)
      .then((response) => {
        res.status(200).json({ response, newLink });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  validation.result && searchLink();
});
app.post("/createCompleteLink", (req, res) => {
  var validation = validateComplexLink(req.body);
  if (!validation.result) {
    res.status(400).json({
      code: validation.code,
      message:
        "A correct url has not been sent. Please try again after checking your URL.",
    });
  }
  const link = req.body;

  function searchLink() {
    //If userId check if link already exist for this user. In that case return error and status.
    link.userId &&
      db
        .collection("links")
        .findOne({ toUrl: link.toUrl, userId: link.userId })
        .then((response) => {
          if (response) {
            res.status(409).json({
              code: "CE-0001",
              message: "You already has this url chopped.",
            });
          } else {
            createLink();
          }
        });
  }

  function createLink() {
    const newLink = {
      userId: link?.userId || null,
      fromUrl: link.fromUrl || uuidv4(),
      toUrl: link.toUrl,
      numClicks: 0,
      maxNumClicks: link.maxNumClicks || null,
      password: link.password || null,
      description: link.description || null,
    };

    db.collection("links")
      .insertOne(newLink)
      .then((response) => {
        res.status(200).json({ response, newLink });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  validation.result && searchLink();
});
app.get("/getAllLinks", (req, res) => {
  const links = [];

  db.collection("links")
    .find()
    .forEach((link) => {
      links.push(link);
    })
    .then(() => {
      res.status(200).json({ links: links });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.get("/getUserLinks/:id", (req, res) => {
  const userId = req.params.id;
  if (!userId)
    res.status(400).json("Missing user. No user to search by it's urls.");
  const links = [];

  db.collection("links")
    .find({ userId: userId })
    .forEach((link) => {
      links.push(link);
    })
    .then(() => {
      res.status(200).json({ links: links });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
app.put("/links/:id", (req, res) => {
  const linkId = req.params.id;
  const updateLink = req.body;

  if (ObjectId.isValid(linkId)) {
    const updateId = new ObjectId(linkId);

    db.collection("links")
      .updateOne({ _id: updateId }, { $set: updateLink })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.status(500).json(`Given id is not valid: ${linkId}.`);
  }
});
app.delete("/links/:id", (req, res) => {
  const linkId = req.params.id;

  if (ObjectId.isValid(linkId)) {
    const deleteId = new ObjectId(linkId);

    db.collection("links")
      .deleteOne({ _id: deleteId })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.status(500).json(`Given id is not valid: ${linkId}.`);
  }
});

const updateVisit = (linkId) => {
  if (ObjectId.isValid(linkId)) {
    const updateId = new ObjectId(linkId);

    db.collection("links")
      .updateOne({ _id: updateId }, { $inc: { numClicks: 1 } })
      .then((response) => { });
  }
};

app.get("/:fromUrl", (req, res) => {
  const fromUrl = req.params.fromUrl;

  db.collection("links")
    .findOne({ fromUrl: fromUrl })
    .then((link) => {
      if (link) {
        if (
          link.maxNumClicks &&
          (link.numClicks || link.numClicks == 0) &&
          link.numClicks < Number(link.maxNumClicks)
        ) {
          updateVisit(link._id);
          res.status(200).json(link);
        } else if (!link.maxNumClicks) {
          updateVisit(link._id);
          res.status(200).json(link);
        } else {
          res.status(403).json({ code: "SH-0003" });
        }
      } else {
        res.status(404).json({ code: "SH-0001" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.post("/authorizeUrl", (req, res) => {
  const password = req.body.password;
  const fromUrl = req.body.fromUrl;

  db.collection("links")
    .findOne({ fromUrl: fromUrl, password: password })
    .then((link) => {
      if (link) {
        res.status(200).json(link);
      } else {
        res.status(404).json({ code: "SH-0002" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
