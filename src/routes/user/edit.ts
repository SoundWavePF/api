import { Router } from 'express';
import db from '../../models/db';
import bcrypt from 'bcrypt';

export const updateRouter = Router();

updateRouter.post('/', async (req, res) => {
    const { id, field, oldData, newData } = req.body;
    try {
        const user = await db.user.findOne({
            where: {
                id: id
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
            if (isValidPassword) {
                user.password = newData;
                await user.save();
                return res.send({message: 'Password updated'});
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
        return res.send({message: 'Error'});
    }catch (e:any) {
        return res.send({message: e.message})
    }
})