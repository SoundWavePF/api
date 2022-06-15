import { Router } from 'express';
import db from '../../models/db'

export const playlistRouter = Router();

playlistRouter.post('/', async(req, res)=>{
    try{
        const { userId } = req.body;
        const userPlaylist = await db.Playlist.findAll({
            attributes :{exclude: ['UserId']},
            where: {UserId: userId}
        })
        return res.send(userPlaylist)
    } catch (e:any) {
        return res.send(e.message)
    }

})

playlistRouter.get('/all', async(_req, res)=>{
    try{
        const playlistOnDb = await db.Playlist.findAll({
            attributes :{exclude: ['UserId']},
            include: [{model: db.User, attributes: {exclude: ['email', 'password']}}]
        })
        return res.send(playlistOnDb)
    } catch (e:any) {
        return res.send(e.message)
    }

})

playlistRouter.get('/:playlistId', async(req, res)=>{
    const { playlistId } = req.params;
    try{
        const playlistOnDb = await db.Playlist.findOne({
            attributes :{exclude: ['UserId']},
            where: {id: playlistId},
            include: [{model: db.User, attributes: {exclude: ['email', 'password']}}, {model: db.Song, attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'ArtistId', 'GenreId']}}]
        })
        return res.send(playlistOnDb)
    } catch (e:any) {
        return res.send(e.message)
    }

})

playlistRouter.post('/create', async(req, res)=>{
    const { userId, playlistName } = req.body;

    try {
        const user = await db.User.findOne({ where: { id: userId } })
        const playlistCreated = await db.Playlist.create({
            "name": playlistName
        })
        user.addPlaylists(playlistCreated)

        return res.send({ message: `Playlist: ${playlistName} created by User: ${userId}` })
    } catch (e:any) {
        return res.send(e.message)
    }
})

playlistRouter.post('/add', async (req, res) => {
    const { playlistId, songId } = req.body;
    try {
        const playlist = await db.Playlist.findOne({ where: { id: playlistId } })
        const song = await db.Song.findOne({ where: { id: songId } })
        playlist.addSong(song)
        return res.send({ message: `Song: ${song.title} has been added to Playlist: ${playlist.name}` })
    } catch (e) {
        // console.log(e)
        return res.send(e)
    }
})

playlistRouter.delete('/remove', async (req, res) => {
    const { playlistId, songId } = req.body;
    try {
        const playlist = await db.Playlist.findOne({ where: { id: playlistId } })
        const song = await db.Song.findOne({ where: { id: songId } })
        playlist.removeSongs(song)
        return res.send({ message: `Song: ${songId} has been removed from Playlist: ${playlist.name}` })
    } catch (e) {
        return res.send(e)
    }
})


playlistRouter.delete('/delete', async (req, res) => {
    const { playlistId } = req.body;
    try {
        await db.Playlist.destroy({ where: { id: playlistId } })

        return res.send({ message: `Playlist with id: ${playlistId} has been deleted` })
    } catch (e) {
        return res.send(e)
    }
})