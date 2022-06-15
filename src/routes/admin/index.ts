import { Router } from 'express';
import db from '../../models/db';

export const adminRouter = Router();

adminRouter.post('/users', async(req,res)=>{
    const { adminId } = req.body;
    try {
        const admin = await db.user.findOne({where: {id: adminId}});
        if(admin.rol=== 'admin') {
            const users = await db.user.findAll({attributes: {exclude: ['password']}});
            return res.send(users);
        }
        return res.send({message: 'You are not an admin'})
    } catch (e:any) {
        return res.send({error: e.message})
    }
})

adminRouter.post('/update', async(req,res)=>{
    const { adminId, userId, field, newData } = req.body;
    try {
        const admin = await db.user.findOne({where: {id: adminId}});
        if(admin.rol=== 'admin') {
            const user = await db.user.findOne({where: {id: userId}});
            if(field === 'email'){
                user.email = newData;
                await user.save();
                return res.send({message: 'Email updated'});
            }
            if(field === 'password'){
                user.password = newData;
                await user.save();
                return res.send({message: 'Password updated'});
            }
            if(field === 'username'){
                user.username = newData;
                await user.save();
                return res.send({message: 'Username updated'});
            }
            if(field === 'avatar'){
                user.image_avatar = newData;
                await user.save();
                return res.send({message: 'Avatar updated'});
            }
            if(field==='rol'){
                user.rol = newData;
                await user.save();
                return res.send({message: 'Rol updated'});
            }
        }
        return res.send({message: 'You are not an admin'});
    } catch (e:any) {
        return res.send({error: e.message})
    }
})