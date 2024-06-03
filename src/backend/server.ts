require("dotenv").config();
import express, { Request, Response } from "express";
import { GithubUser } from "./types/types";
import session from "express-session";
const cookieParser = require("cookie-parser");
import passport from "passport";
import cors from "cors";
import { Strategy as GithubStrategy } from "passport-github";
import jwt from "jsonwebtoken";
import { Db, ObjectId } from "mongodb";
import { connectToDb, getDb } from "./db";
import { validateEasyLink, validateComplexLink } from "./validation";
import { v4 as uuidv4 } from "uuid";

const app = express(); // Create an instance of Express
app.use(express.json());
const corsOptions = {
  origin: "*", // Allow requests from your frontend origin
  credentials: true, // Allow credentials (cookies, authorization headers)
};
app.use(cors(corsOptions));
app.use(cookieParser());

// Configure express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY!,
    resave: false,
    saveUninitialized: true,
  }),
);

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport serialization and deserialization
passport.serializeUser((user: any, done: Function) => {
  done(null, user);
});
passport.deserializeUser((user: any, done: Function) => {
  done(null, user);
});
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: "/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle GitHub OAuth callback
      // Add your user authentication logic here
      return done(null, profile);
    },
  ),
);

// Custom middleware to generate JWT token and store it in a session cookie
const generateTokenMiddleware = (req: any, res: any, next: Function) => {
  const reqUser = req.user;
  const returned: GithubUser = {
    id: reqUser?.id,
    username: reqUser?.username,
    name: reqUser?.displayName,
    avatarUrl: reqUser?.photos[0]?.value || null,
  };
  const token = jwt.sign(reqUser, process.env.JWT_SECRET_KEY!, {
    expiresIn: "5h",
  });
  req.session.token = token; // Store token in session
  res.cookie("token", token, { httpOnly: true }); // Send token as a cookie to the client

  next();
};

//AUTH ROUTES ------------------------------------------
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  generateTokenMiddleware,
  (req, res) => {
    const user: any = req.user;
    res.redirect(process.env.FRONT_URL!);
  },
);
// Route to handle user data retrieval based on token
app.get("/user", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONT_URL!); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, authorization headers)

  const token: string = String(req.cookies.token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Token is valid, extract user information from decoded token
    const userData = <any>decoded;

    const returned: GithubUser = {
      id: userData?.id,
      username: userData?.username,
      name: userData?.displayName,
      avatarUrl: userData?.photos[0]?.value || null,
    };

    res.status(200).json(returned);
  });
});

app.get("/logout", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONT_URL!); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, authorization headers)

  // Clear the cookie by setting its expiration date to the past
  res.cookie("token", "", { expires: new Date(0) });

  // Redirect the user or send a response as needed
  // res.redirect("/");
  res.status(200).json({ ok: true });
});

//LINKS ROUTES ------------------------------------------
let db: Db | any;
connectToDb((err) => {
  if (err) return;
  db = getDb();
});
app.post("/createBasicLink", (req, res) => {
  var validation = validateEasyLink(req.body);
  if (!validation.result) {
    res
      .status(400)
      .json({
        code: validation.code,
        message: "A correct url has not been sent. Please try again after checking your URL.",
      });
  }
  const link = req.body;

  function searchLink() {
    //If userId check if link already exist for this user. In that case return error and status.
    link.userId &&
      db
        .collection("links")
        .findOne({ toUrl: link.toUrl, userId: link.userId })
        .then((response: any) => {
          if (response) {
            res.status(409).json({
              code: "CE-0001", message: "You already has this url chopped."
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
      .then((response: any) => {
        res.status(200).json({ response, newLink });
      })
      .catch((err: any) => {
        res.status(500).json(err);
      });
  }

  validation.result && searchLink();
});
app.post("/createCompleteLink", (req, res) => {
  var validation = validateComplexLink(req.body);
  if (!validation.result) {
    res
      .status(400)
      .json({
        code: validation.code,
        message: "A correct url has not been sent. Please try again after checking your URL.",
      });
  }
  const link = req.body;

  function searchLink() {
    //If userId check if link already exist for this user. In that case return error and status.
    link.userId &&
      db
        .collection("links")
        .findOne({ toUrl: link.toUrl, userId: link.userId })
        .then((response: any) => {
          if (response) {
            res.status(409).json({
              code: "CE-0001", message: "You already has this url chopped."
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
      .then((response: any) => {
        res.status(200).json({ response, newLink });
      })
      .catch((err: any) => {
        res.status(500).json(err);
      });
  }
  validation.result && searchLink();
});

app.get("/getAllLinks", (req, res) => {
  const links: any = [];

  db.collection("links")
    .find()
    .forEach((link: any) => {
      links.push(link);
    })
    .then(() => {
      res.status(200).json({ links: links });
    })
    .catch((err: any) => {
      res.status(500).json(err);
    });
});

app.get("/getUserLinks/:id", (req, res) => {
  const userId = req.params.id;
  if (!userId)
    res.status(400).json("Missing user. No user to search by it's urls.");
  const links: any = [];

  db.collection("links")
    .find({ userId: userId })
    .forEach((link: any) => {
      links.push(link);
    })
    .then(() => {
      res.status(200).json({ links: links });
    })
    .catch((err: any) => {
      res.status(500).json(err);
    });
});


app.put("/links/:id", (req, res) => {
  const linkId = req.params.id;
  const updateLink = req.body;

  if (ObjectId.isValid(linkId)) {
    const updateId = new ObjectId(linkId);

    db.collection("links")
      .updateOne({ _id: updateId },
        { $set: updateLink })
      .then((response: any) => {
        res.status(200).json(response);
      })
      .catch((err: any) => {
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
      .then((response: any) => {
        res.status(200).json(response);
      })
      .catch((err: any) => {
        res.status(500).json(err);
      });
  } else {
    res.status(500).json(`Given id is not valid: ${linkId}.`);
  }
});





// Start the server
const port = process.env.PORT! || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
