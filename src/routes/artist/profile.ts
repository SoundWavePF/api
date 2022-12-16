import {Router} from "express";
import db from "../../models/db";

export const artistProfileRouter = Router();

artistProfileRouter.post('/update', async (req, res) => {
    const {email, name, description, image} = req.body;
    try {
        if(!email){
            return res.send({message: 'Email is required'});
        }
        const user = await db.user.findOne({where: {email: email}});
        if(!user){
            return res.send({message: 'User not found'});
        }
        const artist = await db.artist.findOne({where: {userId: user.id}});
        if(!artist){
            return res.send({message: 'Artist not found'});
        }
        await artist.update({
            name: name || artist.name,
            description: description || artist.description,
            image_small: image || artist.image_small,
            image_medium: image || artist.image_medium,
            image_big: image || artist.image_big,
        })
        return res.send({message: 'Artist updated'});
    } catch (e:any) {
        return res.send({message: e.message});
    }
})