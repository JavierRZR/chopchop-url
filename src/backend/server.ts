require("dotenv").config();
import express, { Request, Response } from "express";
import { GithubUser } from "./types/types";
import session from "express-session";
const cookieParser = require("cookie-parser");
import passport from "passport";
import cors from "cors";
import { Strategy as GithubStrategy } from "passport-github";
import jwt from "jsonwebtoken";

const app = express(); // Create an instance of Express
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

//ROUTES ------------------------------------------
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
  res.status(200).json({ok: true});
});

// Start the server
const port = process.env.PORT! || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
