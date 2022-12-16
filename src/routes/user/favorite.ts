import { Router } from 'express';
import db from '../../models/db'

export const favoriteRouter = Router();

favoriteRouter.post('/', async(req,res)=>{
    const { email } = req.body;

    try {
        const user = await db.user.findOne({
            where:{email: email},
            include: [{model: db.song,
                        include: [db.genre, {model:db.artist, attributes: ['name', 'id']}, {model:db.album, attributes: ['name', 'id']}]}]
        })
        if (user === null) {
            return res.send(`No user with email: ${email}`)
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
    const { email } = req.body
    try {
        const song = await db.song.findOne({
            where: { id: idSong },
            include: [{model: db.album}, {model: db.artist}]
        })
        const user = await db.user.findOne({
            where: { email: email }
        })
        if (user === null) {
            return res.send(`No user with email: ${email}`)
        }
        song.added_to_favorites += 1;
        song.save();
        user.addSong(song)
        return res.send({ message: `user: ${email} liked song: ${idSong}` })
    } catch (e) {
        return res.send(e)
    }
})


favoriteRouter.post('/remove/:idSong', async (req, res) => {
    const { idSong } = req.params;
    const { email } = req.body

    try {
        const song = await db.song.findOne({
            where: { id: idSong }
        })
        const user = await db.user.findOne({
            where: { email: email }
        })
        song.added_to_favorites -= 1;
        song.save();
        user.removeSong(song)
        return res.send({ message: `user: ${email} disliked song: ${idSong}` })
    } catch (e) {
        return res.send(e)
    }
})
