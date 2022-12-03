import express from 'express';
import {routes} from './routes'
// const cookieParser = require('cookie-parser');
import cors from "cors";
import passport from 'passport';
// const session = require('cookie-session');
// import session from 'express-session'

// TODO: REMOVE UNUSED IMPORTS
export const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(passport.initialize());

require('./config/passport');
require('./config/passport-google');

// server.use(cookieParser('secret'));
// server.use(session({
//     secret: process.env.SESSION_SECRET!,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }));
server.set('views', __dirname + '/views');
server.set("view engine", "ejs");
server.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use('/', routes)