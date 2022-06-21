import { Router } from 'express';
import db from '../../models/db';
import bcrypt from 'bcrypt';

export const updateRouter = Router();
export const artistRequestRouter = Router();
export const deactivateRouter = Router();

updateRouter.post('/', async (req, res) => {
    const { email, field, oldData, newData } = req.body;
    try {
        const user = await db.user.findOne({
            where: {
                email:email
            }
        });
        if(field === 'email'){
            if (user.email === oldData) {
                user.email = newData;
                await user.save();
                return res.send({message: 'Email updated'});
            }
        }
        if(field === 'password'){
            const isValidPassword = await bcrypt.compare(oldData, user.password);
            const hashedPassword = await bcrypt.hash(newData, 10);
            if (isValidPassword) {
                user.password = hashedPassword;
                await user.save();
                return res.send({message: 'Password updated'});//body changed to email
            }
        }
        if(field === 'username'){
            if (user.username === oldData) {
                user.username = newData;
                await user.save();
                return res.send({message: 'Username updated'});
            }
        }
        if(field === 'avatar'){
            user.image_avatar = newData;
            await user.save();
            return res.send({message: 'Avatar updated'});
        }
        return res.send({message: 'Wrong Request'});
    }catch (e:any) {
        return res.send({message: e.message})
    }
})

artistRequestRouter.post('/', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await db.user.findOne({
            where: {
               email:email
            }
        });
        if(user.rol === 'artist'){
            return res.send({message: 'You are already an artist'});
        }
        if(user.requested_artist === true){
            return res.send({message: 'You have already requested to be an artist'});
        }
        user.requested_artist = true;
        await user.save();
        return res.send({message: 'Request sent'});
    } catch (e:any) {
        return res.send({message: e.message})
    }
})

deactivateRouter.post('/', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await db.user.findOne({where: {email: email}});
        if(user.deactivated !== true){
            user.deactivated = true;
            await user.save();
            return res.send({message: 'Account deactivated'});
        }
        return res.send({message: 'Account already deactivated'});
    } catch (e:any) {
        return res.send({message: e.message})
    }
})
