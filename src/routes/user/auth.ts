import { Router } from 'express';
import db from '../../models/db';
import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { UserOnDb } from '../../interfaces';

export const authRouter = Router();

authRouter.post('/signup', async(req, res) => {
    try{
        let {username, email, password} = req.body;
        if(!email || !password) {
            res.send({
                success: false,
                message: 'Missing data'
            })
            return;
        }
        if(!username) username = email.split('@')[0];
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser: UserOnDb = await db.user.create({
            name: username,
            username: username,
            email: email,
            image_avatar: `https://ui-avatars.com/api/?name=${username}&background=random&size=256`,
            password: hashedPassword,
        })
        res.send({
            success: true,
            message: 'User successfully created',
            token: jwt.sign({id: newUser.id}, process.env.JWT_PRIVATE_KEY!, {expiresIn: '8d'})
        })
    } catch (e) {
        const reason = handleDBError(e);
        res.send({
            success: false,
            message: reason
        })
    }

})

authRouter.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) {
            res.send({
                success: false,
                message: 'Missing data'
            })
            return;
        }
        const userOnDb: UserOnDb = await db.user.findOne({where: {email}})
        if(!userOnDb){
            res.send({
                success: false,
                message: 'User does not exist'
            })
            return;
        }
        const correctPassword = await bcrypt.compare(password, userOnDb.password!)
        if(!correctPassword) {
            res.send({
                success: false,
                message: 'Wrong password'
            })
            return;
        }

        res.send({
            success: true,
            message: 'Login successfull',
            token: jwt.sign({id: userOnDb.id}, process.env.JWT_PRIVATE_KEY!, {expiresIn: '8d'})
        })


    } catch (e){
        const reason = handleDBError(e);
        res.send({
            success: false,
            message: reason
        })
    }
})

authRouter.get('/google', passport.authenticate('google', { scope:[ 'email', 'profile' ] }));


authRouter.get('/google/callback', passport.authenticate('google', { 
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    session: false
}), (req, res)=>{
    const user: UserOnDb = req.user as UserOnDb
    const token = jwt.sign({id: user.id}, process.env.JWT_PRIVATE_KEY!, {expiresIn: '8d'})
    res.redirect(`${process.env.CLIENT_URL}/OAUTH/${token}`)
});

const handleDBError = (error: any) => {
    const {name, errors} = error;
    if(name === 'SequelizeUniqueConstraintError' && errors[0].path === 'email'){
        return 'User already exists';
    }
    console.log(error);
    return 'unknown error, please check console';
}