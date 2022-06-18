import {Router} from "express";
import db from "../../models/db";

export const artistProfileRouter = Router();

artistProfileRouter.post('/update', async (req, res) => {
    const {email, name, description, image_small, image_medium, image_big} = req.body;
    try {
        const user = await db.user.findOne({where: {email: email}});
        const artist = await db.artist.findOne({where: {userId: user.id}});
        await artist.update({
            name: name,
            // description: description,
            image_small: image_small,
            image_medium: image_medium,
            image_big: image_big,
        })
        return res.send({message: 'Artist updated'});
    } catch (e:any) {
        return res.send({message: e.message});
    }
})