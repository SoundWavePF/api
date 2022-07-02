import { Router } from 'express';
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const localStrategy = require('passport-local').Strategy;
import db from '../../models/db';

export const registerRouter = Router();

passport.use('register', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req:any, username:any, password:any, done:any)=>{
    const {email } = req.body;
    if(!username || !email || !password){
        return done(null, false, {message: 'All fields are required'})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const lookingForUser = await db.user.findOne({where: {username}})
        const lookingForEmail = await db.user.findOne({where: {email}})
        if(lookingForUser && lookingForEmail){
            return done(null, false, {message: 'db.user already exists'})
        }
        if(lookingForUser){
            return done(null, false, {message: 'Username is already taken'})
        }
        if(lookingForEmail){
            return done(null, false, {message: 'Email already exists'})
        }
        const createNewUser = await db.user.create({
            username,
            email,
            password: hashedPassword
        })
        return done(null, createNewUser, {message: 'success'})
    } catch (e: any) {
        return done(null, false, {message: e.message})
    }
}))

registerRouter.post('/', passport.authenticate('register', {session: false}), async (req:any, res:any) => {
    const {email} = req.user;
    const user = await db.user.findOne({where: {email}})
    console.log(user)
    const token = jwt.sign({id: user.id, username: user.id, email: user.email}, 'secret');
    res.send({
            message: 'success',
            token: token
        })
})