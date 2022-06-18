import { Router } from 'express';
import db from '../../models/db'

export const playlistRouter = Router();

playlistRouter.post('/', async(req, res)=>{
    try{
        const { email } = req.body;
        console.log( req.body);
        const user = await db.user.findOne({where: {email: email}});
        
        const userPlaylist = await db.playlist.findAll({
            attributes :{exclude: ['userId']},
            where: {userId: user.id}
        })
        return res.send(userPlaylist)
    } catch (e:any) {
        return res.send({message: e.message})
    }

})

playlistRouter.get('/all', async(_req, res)=>{
    try{
        const playlistOnDb = await db.playlist.findAll({
            attributes :{exclude: ['userId']},
            include: [{model: db.user, attributes: {exclude: ['email', 'password']}}]
        })
        return res.send(playlistOnDb)
    } catch (e:any) {
        return res.send({message: e.message})
    }

})
playlistRouter.post('/create', async(req, res)=>{
    const { email, playlistName } = req.body;

    try {
        const user = await db.user.findOne({ where: { email: email } })
        const playlistCreated = await db.playlist.create({
            "name": playlistName
        })
        user.addPlaylist(playlistCreated)

        return res.send({ message: `playlist: ${playlistName} created by user: ${email}` })
    } catch (e:any) {
        return res.send({message: e.message})
    }
})



playlistRouter.post('/add', async (req, res) => {
    const { playlistId, songId } = req.body;
    try {
        const playlist = await db.playlist.findOne({ where: { id: playlistId } })
        const song = await db.song.findOne({ where: { id: songId } })
        playlist.addSong(song)
        return res.send({ message: `song: ${song.title} has been added to playlist: ${playlist.name}` })
    } catch (e:any) {
        // console.log(e)
        return res.send({message: e.message})
    }
})

playlistRouter.post('/remove', async (req, res) => {
    const { playlistId, songId } = req.body;
    try {
        const playlist = await db.playlist.findOne({ where: { id: playlistId } })
        const song = await db.song.findOne({ where: { id: songId } })
        playlist.removeSong(song)
        return res.send({ message: `song: ${songId} has been removed from playlist: ${playlist.name}` })
    } catch (e) {
        return res.send(e)
    }
})


playlistRouter.post('/delete', async (req, res) => {
    const { playlistId } = req.body;
    try {
        await db.playlist.destroy({ where: { id: playlistId } })

        return res.send({ message: `playlist with id: ${playlistId} has been deleted` })
    } catch (e) {
        return res.send(e)
    }
})

playlistRouter.get('/:playlistId', async(req, res)=>{
    const { playlistId } = req.params;
    try{
        const playlistOnDb = await db.playlist.findOne({
            attributes :{exclude: ['userId']},
            where: {id: playlistId},
            include: [{model: db.user, attributes: {exclude: ['email', 'password']}}, {model: db.song, attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'albumId']}, include: [{model: db.album, attributes: ['name']}, {model:db.artist, attributes: ['name']}]}]
        })
        return res.send(playlistOnDb)
    } catch (e:any) {
        return res.send({message: e.message})
    }

})
