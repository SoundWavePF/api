import { Router } from 'express';
import db from '../../models/db'

export const favoriteRouter = Router();

favoriteRouter.post('/', async(req,res)=>{
    const { userId } = req.body;

    try {
        const user = await db.user.findOne({
            where:{id: userId},
            include: [{model: db.song, include:[{model:db.artist, attributes: ['name']}, db.genre], attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference']}}]
        })
        if (user === null) {
            return res.send(`No user with Id: ${userId}`)
        }
        return res.send({
            "id": user.id,
            "username": user.username,
            "liked_songs": user.songs
        })
    } catch (e) {
        return res.send(e)
    }
})


favoriteRouter.post('/add/:idSong', async (req, res) => {
    const { idSong } = req.params;
    const { userId } = req.body

    try {
        const song = await db.song.findOne({
            where: { id: idSong }
        })
        const user = await db.user.findOne({
            where: { id: userId }
        })
        user.addSongs(song)
        return res.send({ message: `user: ${userId} liked song: ${idSong}` })
    } catch (e) {
        return res.send(e)
    }
})


favoriteRouter.delete('/remove/:idSong', async (req, res) => {
    const { idSong } = req.params;
    const { userId } = req.body

    try {
        const song = await db.song.findOne({
            where: { id: idSong }
        })
        const user = await db.user.findOne({
            where: { id: userId }
        })
        user.removeSongs(song)
        return res.send({ message: `user: ${userId} disliked song: ${idSong}` })
    } catch (e) {
        return res.send(e)
    }
})