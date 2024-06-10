"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cookieParser = require("cookie-parser");
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const passport_github_1 = require("passport-github");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("mongodb");
const db_1 = require("./db");
const validation_1 = require("./validation");
const uuid_1 = require("uuid");
const app = (0, express_1.default)(); // Create an instance of Express
app.use(express_1.default.json());
const corsOptions = {
    origin: "*", // Allow requests from your frontend origin
    credentials: true, // Allow credentials (cookies, authorization headers)
};
app.use((0, cors_1.default)(corsOptions));
app.use(cookieParser());
// Configure express-session middleware
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
}));
// Initialize passport middleware
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Passport serialization and deserialization
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
passport_1.default.use(new passport_github_1.Strategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback",
}, (accessToken, refreshToken, profile, done) => {
    // Handle GitHub OAuth callback
    // Add your user authentication logic here
    return done(null, profile);
}));
// Custom middleware to generate JWT token and store it in a session cookie
const generateTokenMiddleware = (req, res, next) => {
    var _a;
    const reqUser = req.user;
    const returned = {
        id: reqUser === null || reqUser === void 0 ? void 0 : reqUser.id,
        username: reqUser === null || reqUser === void 0 ? void 0 : reqUser.username,
        name: reqUser === null || reqUser === void 0 ? void 0 : reqUser.displayName,
        avatarUrl: ((_a = reqUser === null || reqUser === void 0 ? void 0 : reqUser.photos[0]) === null || _a === void 0 ? void 0 : _a.value) || null,
    };
    const token = jsonwebtoken_1.default.sign(reqUser, process.env.JWT_SECRET_KEY, {
        expiresIn: "5h",
    });
    req.session.token = token; // Store token in session
    res.cookie("token", token, { httpOnly: true }); // Send token as a cookie to the client
    next();
};
//AUTH ROUTES ------------------------------------------
app.get("/auth/github", passport_1.default.authenticate("github", { scope: ["user:email"] }));
app.get("/auth/github/callback", passport_1.default.authenticate("github", { failureRedirect: "/login" }), generateTokenMiddleware, (req, res) => {
    const user = req.user;
    res.redirect(process.env.FRONT_URL);
});
// Route to handle user data retrieval based on token
app.get("/user", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.FRONT_URL); // Allow requests from any origin
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, authorization headers)
    const token = String(req.cookies.token);
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        var _a;
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }
        // Token is valid, extract user information from decoded token
        const userData = decoded;
        const returned = {
            id: userData === null || userData === void 0 ? void 0 : userData.id,
            username: userData === null || userData === void 0 ? void 0 : userData.username,
            name: userData === null || userData === void 0 ? void 0 : userData.displayName,
            avatarUrl: ((_a = userData === null || userData === void 0 ? void 0 : userData.photos[0]) === null || _a === void 0 ? void 0 : _a.value) || null,
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
(0, db_1.connectToDb)((err) => {
    if (err)
        return;
    db = (0, db_1.getDb)();
});
app.post("/createBasicLink", (req, res) => {
    var validation = (0, validation_1.validateEasyLink)(req.body);
    if (!validation.result) {
        res.status(400).json({
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
                .then((response) => {
                if (response) {
                    res.status(409).json({
                        code: "CE-0001",
                        message: "You already has this url chopped.",
                    });
                }
                else {
                    createLink();
                }
            });
        !link.userId && createLink();
    }
    function createLink() {
        const newLink = {
            userId: (link === null || link === void 0 ? void 0 : link.userId) || null,
            fromUrl: (0, uuid_1.v4)(),
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
    var validation = (0, validation_1.validateComplexLink)(req.body);
    if (!validation.result) {
        res.status(400).json({
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
                .then((response) => {
                if (response) {
                    res.status(409).json({
                        code: "CE-0001",
                        message: "You already has this url chopped.",
                    });
                }
                else {
                    createLink();
                }
            });
    }
    function createLink() {
        const newLink = {
            userId: (link === null || link === void 0 ? void 0 : link.userId) || null,
            fromUrl: link.fromUrl || (0, uuid_1.v4)(),
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
    if (mongodb_1.ObjectId.isValid(linkId)) {
        const updateId = new mongodb_1.ObjectId(linkId);
        db.collection("links")
            .updateOne({ _id: updateId }, { $set: updateLink })
            .then((response) => {
            res.status(200).json(response);
        })
            .catch((err) => {
            res.status(500).json(err);
        });
    }
    else {
        res.status(500).json(`Given id is not valid: ${linkId}.`);
    }
});
app.delete("/links/:id", (req, res) => {
    const linkId = req.params.id;
    if (mongodb_1.ObjectId.isValid(linkId)) {
        const deleteId = new mongodb_1.ObjectId(linkId);
        db.collection("links")
            .deleteOne({ _id: deleteId })
            .then((response) => {
            res.status(200).json(response);
        })
            .catch((err) => {
            res.status(500).json(err);
        });
    }
    else {
        res.status(500).json(`Given id is not valid: ${linkId}.`);
    }
});
const updateVisit = (linkId) => {
    if (mongodb_1.ObjectId.isValid(linkId)) {
        const updateId = new mongodb_1.ObjectId(linkId);
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
            if (link.maxNumClicks &&
                (link.numClicks || link.numClicks == 0) &&
                link.numClicks < Number(link.maxNumClicks)) {
                updateVisit(link._id);
                res.status(200).json(link);
            }
            else if (!link.maxNumClicks) {
                updateVisit(link._id);
                res.status(200).json(link);
            }
            else {
                res.status(403).json({ code: "SH-0003" });
            }
        }
        else {
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
        }
        else {
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
//# sourceMappingURL=server.js.map