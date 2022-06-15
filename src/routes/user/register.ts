import { Router } from 'express';
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const localStrategy = require('passport-local').Strategy;
import db from '../../models/db';
const { user } = db;

export const registerRouter = Router();

passport.use('register', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req: any, username: any, password: any, done: any) => {
    const { email } = req.body;
    if (!username || !email || !password) {
        return done(null, false, { message: 'All fields are required' })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const lookingForUser = await user.findOne({ where: { username } })
        const lookingForEmail = await user.findOne({ where: { email } })
        if (lookingForUser && lookingForEmail) {
            return done(null, false, { message: 'User already exists' })
        }
        if (lookingForUser) {
            return done(null, false, { message: 'Username is already taken' })
        }
        if (lookingForEmail) {
            return done(null, false, { message: 'Email already exists' })
        }
        const createNewUser = await user.create({
            username,
            email,
            password: hashedPassword
        })
        // localStorage.setItem()
        return done(null, createNewUser, { message: 'success' })
    } catch (e: any) {
        return done(null, false, { message: e.message })
    }
}))

registerRouter.post('/', passport.authenticate('register', { session: false }), async (req: any, res: any) => {
    const token = jwt.sign({ username: req.user.username }, 'secret');
    res.send({
        message: 'success',
        token: token
    })
})