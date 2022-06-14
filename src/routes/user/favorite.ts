import { Router } from 'express';
import db from '../../models/db'

export const favoriteRouter = Router();

favoriteRouter.post('/', async(req,res)=>{
    const { userId } = req.body;

    try {
        const user = await db.user.findOne({
            where:{id: userId},
            include: [{model: db.song, attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'ArtistId', 'GenreId']}, include: db.genre, }]
        })
        if (user === null) {
            res.send(`No user with Id: ${userId}`)
            return
        }
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
        const song = await db.song.findOne({
            where: { id: idSong }
        })
        const user = await db.user.findOne({
            where: { id: userId }
        })
        user.addSongs(song)
        res.send({ message: `user: ${userId} liked song: ${idSong}` })
    } catch (e) {
        res.send(e)
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
        res.send({ message: `user: ${userId} disliked song: ${idSong}` })
    } catch (e) {
        res.send(e)
    }
})