import { Request } from "express";
import passport from "passport";
import db from '../models/db';
import { UserOnDb } from "../interfaces";
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth2';

passport.use(new GoogleStrategy({
    clientID:     process.env.OAUTH_CLIENTID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    callbackURL: `${process.env.API_URL!}/auth/google/callback`,
    passReqToCallback   : true
  },
  async function(_req: Request, _accessToken: string, _refreshToken: string, profile: any, done: VerifyCallback) {
    try{
        const user: UserOnDb = await db.user.findOne({where: {email: profile.email}})
        if(!user) {
            const newUser = await db.user.create({
                name: profile.displayName,
                username: profile.email.split('@')[0],
                email: profile.email,
                image_avatar: profile.picture,
            })
            return done(null, newUser);
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
  }
));