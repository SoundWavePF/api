import { Router } from 'express';
import db from '../../models/db'

export const favoriteRouter = Router();

favoriteRouter.post('/', async(req,res)=>{
    const { email } = req.body;

    try {
        const user = await db.user.findOne({
            where:{email: email},
            include: [{model: db.song,
                        include: db.genre}]
        })
        if (user === null) {
            return res.send(`No user with email: ${email}`)
        }
        return res.send(user)
        // return res.send({
        //     // "id": user.id,
        //     "username": user.username,
        //     "liked_songs": user.songs
        // })
    } catch (e) {
        return res.send(e)
    }
})


favoriteRouter.post('/add/:idSong', async (req, res) => {
    const { idSong } = req.params;
    const { email } = req.body

    try {
        const song = await db.song.findOne({
            where: { id: idSong }
        })
        const user = await db.user.findOne({
            where: { email: email }
        })
        user.addSong(song)
        return res.send({ message: `user: ${email} liked song: ${idSong}` })
    } catch (e) {
        return res.send(e)
    }
})


favoriteRouter.delete('/remove/:idSong', async (req, res) => {
    const { idSong } = req.params;
    const { email } = req.body

    try {
        const song = await db.song.findOne({
            where: { id: idSong }
        })
        const user = await db.user.findOne({
            where: { email: email }
        })
        user.removeSong(song)
        return res.send({ message: `user: ${email} disliked song: ${idSong}` })
    } catch (e) {
        return res.send(e)
    }
})