import {Router} from 'express';
import db from '../../models/db';
import passport from 'passport';

export const infoRouter = Router();

infoRouter.post('/', async (req, res) => {
    const { email } = req.body;
    try{
        const user = await db.user.findOne({where: {email: email}, attributes: {exclude: ['password']}, include: db.artist});
        return res.send(user);
    } catch(err){
        return res.status(500).send({message: 'Error'})
    }
})

infoRouter.get('/verify', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send(req.user)
})