import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
//import connectDB from "./config/connectDB";
import session from 'express-session';
import path from 'path';
require('dotenv').config();

let app = express();

app.use(session({
    secret: 'userLogin', // Khóa bí mật để mã hóa session
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Thiết lập cookie, `secure: true` cần HTTPS
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    req.user = req.session.user || null; // Gán user từ session nếu có
    next();
});

viewEngine(app);
initWebRoutes(app);

//connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port)
})