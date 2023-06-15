import express from 'express'
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import cors from 'cors';
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import mongoose from "mongoose";
import ConnectMongo from 'connect-mongo';
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
        // store: new MongoStore({
        //     url: 'mongodb://127.0.0.1:27017/tuiter',
        //     ttl: 14 * 24 * 60 * 60,
        //     autoRemove: 'native'
        // })
    })
);

// app.get('/', (req,res,next) => {
//     req.session.user = {
//         uuid: '12234-2345-2323423'
//     }
//     req.session.save(err => {
//         if(err){
//             console.log(err);
//         } else {
//             res.send(req.session.user)
//         }
//     });
// })

// app.get('/end', (req,res,next) => {
//     req.session.destroy(err => {
//         if(err){
//             console.log(err);
//         } else {
//             res.send('Session is destroyed')
//         }
//     });
// })

app.use((req, res, next) => {
    const allowedOrigins = ["http://localhost:3000", "https://a6--stellular-malasada-11cc12.netlify.app"];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(express.json());
const port = process.env.PORT || 4000;
TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);
app.listen(process.env.PORT || 4000);