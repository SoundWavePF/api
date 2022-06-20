import {Router} from "express";
import db from "../../models/db";

export const artistSongRouter = Router();

artistSongRouter.post('/create', async (req, res) => {
    const { userEmail, songName, image_small, image_medium, image_big, duration, preview } = req.body;
    try {
        const user = await db.user.findOne({where: {email: userEmail}});
        const artist = await db.artist.findOne({where: {userId: user.id}});
        const song = await db.song.create({
            name: songName,
            preview: preview,
            image_small: image_small,
            image_medium: image_medium,
            image_big: image_big,
            duration: duration,
        })
        await artist.addSong(song);
        return res.send({message: 'Song created'});
    } catch (e:any) {
        return res.send({message: e.message});
    }
})


artistSongRouter.post('/delete', async (req, res) => {
    const { songId, email } = req.body;
    try {
        const user = await db.user.findOne({where: {email: email}});
        const song = await db.song.findOne({where: {id: songId}});
        const artist = await db.artist.findOne({where: {userId: user.id}});
        await artist.removeSong(song);
        await song.destroy();
        return res.send({message: 'Song deleted'});
    } catch (e:any) {
        return res.send({message: e.message});
    }
})

artistSongRouter.post('/update', async (req, res) => {
    const {email, songId, songName, image_small, image_medium, image_big, duration} = req.body;
    try {
        const user = await db.user.findOne({where: {email: email}});
        const song = await db.song.findOne({where: {id: songId}});
        await song.update({
            name: songName || song.name,
            image_small: image_small || song.image_small,
            image_medium: image_medium || song.image_medium,
            image_big: image_big || song.image_big,
            duration: duration || song.duration,
        })
        return res.send({message: 'Song updated'});
        } catch (e:any) {
        return res.send({message: e.message});
    }
})