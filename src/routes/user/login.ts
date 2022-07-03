import { Router } from 'express';
import db from '../../models/db';
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const localStrategy = require('passport-local').Strategy;

export const loginRouter = Router();
loginRouter.use(passport.initialize());
loginRouter.use(passport.session());


loginRouter.post('/userRegister', async (req, res) => {
    console.log(req.body.email)
    const { name, username, email, image } = req.body;
    try {
        const [user, created] = await db.user.findOrCreate({
            where: { email: email },
            defaults: {
                name: name,
                username: username,
                email: email,
                image_avatar: image
            }
        })
        if(created === false) {
            user.deactivated = false;
            user.save();
        }
        res.send(user)
    } catch (err) {
        console.log(err)
    }
})


passport.use('login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async(email:any, password:any, done:any)=>{
        try {
            const user = await db.user.findOne({
                where: {email}
            })
            if(!user){
                return done(null, false, {message: `db.user with email ${email} not found`})
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword){
                return done(null, false, {message: 'Invalid password'})
            }
            return done(null, user, {message: 'success'})
        } catch (e) {
            return done(e)
        }
    })
);

loginRouter.post('/', async (req:any, res:any, next: any) => {
    passport.authenticate('login', async (err:any, user:any) => {
        try{
            if(err || !user){
                const error = new Error('new error');
                return next(error);
            }
            req.login(user, {session: false}, async (err:any) => {
                if(err){
                    return next(err);
                }
                const body = {
                    id: user.id
                }
                const token = jwt.sign({id: user.id, username: user.username}, 'secret');
                console.log(body)
                console.log(token)
                res.send({token})
            })
        } catch (e) {
            return next(e)
        }
    })(req, res, next)
})