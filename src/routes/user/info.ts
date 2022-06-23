import {Router} from 'express';
import db from '../../models/db';

export const infoRouter = Router();

infoRouter.post('/', async (req, res) => {
    const { email } = req.body;
    try{
        const user = await db.user.findOne({where: {email: email}});
        return res.send(user);
    } catch(err){
        return res.status(500).send({message: 'Error'})
    }
})
