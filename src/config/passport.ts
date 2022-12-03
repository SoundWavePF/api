import passport from "passport";
import db from '../models/db';
import { UserOnDb } from "../interfaces";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

let opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_PRIVATE_KEY!,
};

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try{
        const user: UserOnDb = await db.user.findOne({where: {id: jwt_payload.id}, attributes: {exclude: ['password']}})
        if(!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
}));