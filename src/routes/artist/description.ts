import {Router} from "express";
import db from "../../models/db";

export const artistDescriptionRouter = Router();

artistDescriptionRouter.post('/', async (req, res) => {
    const {email, description} = req.body;
    try {
        const user = await db.user.findOne({where: {email: email}});
        if(!user) {
            return res.send({message: 'User not found'});
        }
        if(!description) {
            return res.send({message: 'Description is empty'});
        }
        if(user.rol !== 'artist') {
            return res.send({message: 'User is not an artist'});
        }
        const artist = await db.artist.findOne({where: {userId: user.id}});
        await artist.update({
            description: description,
        })
        return res.send({message: 'Artist updated'});
    } catch (e:any) {
        return res.send({message: e.message});
    }
})
