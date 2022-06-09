import {Router} from 'express';
import db from '../../models/db'

export const playlistRouter = Router();

playlistRouter.post('/create', async(req, res)=>{
    const { userId, playlistName } = req.body;

    try{
        const user = await db.User.findOne({where: {id: userId}})
        const playlistCreated = await db.Playlist.create({
            "name": playlistName
        })
        user.addPlaylists(playlistCreated)

        res.send({message: `Playlist: ${playlistName} created by User: ${userId}`})
    } catch (e) {
        res.send(e)
    }
})

playlistRouter.post('/add', async(req, res)=>{
    const { playlistId, songId } = req.body;
    try{
        const playlist = await db.Playlist.findOne({where: {id: playlistId}})
        const song = await db.Song.findOne({where: {id: songId}})
        playlist.addSong(song)
        res.send({message: `Song: ${song.title} has been added to Playlist: ${playlist.name}`})
    } catch (e) {
        res.send(e)
    }
})

playlistRouter.delete('/remove', async(req, res)=>{
    const { playlistId, songId } = req.body;
    try{
        const playlist = await db.Playlist.findOne({where: {id: playlistId}})
        const song = await db.Song.findOne({where: {id: songId}})
        playlist.removeSongs(song)
        res.send({message: `Song: ${songId} has been removed from Playlist: ${playlist.name}`})
    } catch (e) {
        res.send(e)
    }
})


playlistRouter.delete('/delete', async(req, res)=>{
    const { playlistId } = req.body;
    try{
        await db.Playlist.destroy({where: {id: playlistId}})

        res.send({message: `Playlist with id: ${playlistId} has been deleted`})
    } catch (e) {
        res.send(e)
    }
})