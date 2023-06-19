import express from 'express'
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cors from "cors";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/tuiter"

mongoose.connect(CONNECTION_STRING);

const app = express();

app.use(
    session({
        secret: "any string",
        resave: false,
        saveUninitialized: true,
        rolling: true,
        cookie: {
            sameSite: 'none', // the important part
            secure: false, // the important part, changed for local testing
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        },
        store: MongoStore.create({
            mongoUrl: CONNECTION_STRING,
            ttl: 14 * 24 * 60 * 60 // = 14 days. Default
        })
    })
);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
    next();
});

app.use(express.json());
const port = process.env.PORT || 4000;
TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);
app.listen(process.env.PORT || 4000);