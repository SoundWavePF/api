import { Router } from 'express';
import db from '../../models/db'

export const favoriteRouter = Router();

favoriteRouter.get('/', async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await db.User.findOne({
            where: { id: userId },
            include: [{ model: db.Song, include: db.Genre }]
        })
        if (user === null) {
            res.send(`No user with Id: ${userId}`)
            return
        }
        console.log(user.songs)
        res.send({
            "id": user.id,
            "username": user.username,
            "liked_songs": user.Songs
        })
    } catch (e) {
        res.send(e)
    }
})


favoriteRouter.post('/add/:idSong', async (req, res) => {
    const { idSong } = req.params;
    const { userId } = req.body

    try {
        const song = await db.Song.findOne({
            where: { id: idSong }
        })
        const user = await db.User.findOne({
            where: { id: userId }
        })
        user.addSongs(song)
        res.send({ message: `User: ${userId} liked Song: ${idSong}` })
    } catch (e) {
        res.send(e)
    }
})


favoriteRouter.delete('/remove/:idSong', async (req, res) => {
    const { idSong } = req.params;
    const { userId } = req.body

    try {
        const song = await db.Song.findOne({
            where: { id: idSong }
        })
        const user = await db.User.findOne({
            where: { id: userId }
        })
        user.removeSongs(song)
        res.send({ message: `User: ${userId} disliked Song: ${idSong}` })
    } catch (e) {
        res.send(e)
    }
})