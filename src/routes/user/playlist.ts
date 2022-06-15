import { Router } from 'express';
import db from '../../models/db'

export const playlistRouter = Router();

playlistRouter.post('/', async (req, res) => {
    const { userId } = req.body;
    const userPlaylist = await db.playlist.findAll({
        attributes: { exclude: ['userId'] },
        where: { userId: userId }
    })
    res.send(userPlaylist)
})

playlistRouter.get('/all', async (_req, res) => {
    const playlistOnDb = await db.playlist.findAll({
        attributes: { exclude: ['userId'] },
        include: [{ model: db.user, attributes: { exclude: ['email', 'password'] } }]
    })
    res.send(playlistOnDb)
})

playlistRouter.get('/:playlistId', async (req, res) => {
    const { playlistId } = req.params;
    const playlistOnDb = await db.playlist.findOne({
        attributes: { exclude: ['userId'] },
        where: { id: playlistId },
        include: [{ model: db.user, attributes: { exclude: ['email', 'password'] } }, { model: db.song, attributes: { exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'albumId', 'artistId', 'genreId'] } }]
    })
    res.send(playlistOnDb)
})

playlistRouter.post('/create', async (req, res) => {
    const { userId, playlistName } = req.body;

    try {
        const user = await db.User.findOne({ where: { id: userId } })
        const playlistCreated = await db.playlist.create({
            "name": playlistName
        })
        user.addPlaylists(playlistCreated)

        res.send({ message: `Playlist: ${playlistName} created by User: ${userId}` })
    } catch (e) {
        res.send(e)
    }
})

playlistRouter.post('/add', async (req, res) => {
    const { playlistId, songId } = req.body;
    try {
        const playlist = await db.playlist.findOne({ where: { id: playlistId } })
        const song = await db.song.findOne({ where: { id: songId } })
        playlist.addSong(song)
        res.send({ message: `Song: ${song.title} has been added to Playlist: ${playlist.name}` })
    } catch (e) {
        // console.log(e)
        res.send(e)
    }
})

playlistRouter.delete('/remove', async (req, res) => {
    const { playlistId, songId } = req.body;
    try {
        const playlist = await db.playlist.findOne({ where: { id: playlistId } })
        const song = await db.song.findOne({ where: { id: songId } })
        playlist.removeSongs(song)
        res.send({ message: `Song: ${songId} has been removed from Playlist: ${playlist.name}` })
    } catch (e) {
        res.send(e)
    }
})


playlistRouter.delete('/delete', async (req, res) => {
    const { playlistId } = req.body;
    try {
        await db.playlist.destroy({ where: { id: playlistId } })

        res.send({ message: `Playlist with id: ${playlistId} has been deleted` })
    } catch (e) {
        res.send(e)
    }
})