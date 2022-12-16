import express from 'express';
import {routes} from './routes'
import cors from "cors";
import passport from 'passport';

export const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(passport.initialize());

require('./config/passport');
require('./config/passport-google');

server.use('/', routes);