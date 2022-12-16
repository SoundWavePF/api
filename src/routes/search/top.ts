import { Router } from 'express';
import db from '../../models/db';
import {Song, AlbuminStats} from "../../interfaces";

function shuffle(array:any) {
    return array.sort(() => Math.random() - 0.5);
}

export const topRouter = Router();

topRouter.get('/10', async(_req, res)=>{
    try {
        const songs = await db.song.findAll({
            attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference']},
            include: [{model:db.artist, attributes: {exclude: ['image_small', 'image_medium', 'image_big', 'userId']}}, {model: db.album, attributes: ['id','name']}]
        })
        let sorted = songs.sort((a: Song, b: Song) => b.reproductions - a.reproductions)
        return res.send(sorted.slice(0, 20))
    } catch (e) {
        return res.send({message: e})
    }
})


topRouter.get('/discover', async(_req, res)=>{
    try {
        const newAlbums = await db.album.findAll({order:[['release_date', 'DESC']], include: [{model: db.song, include: [{model: db.artist, attributes: ['id', 'name']}, {model: db.album, attributes: ['id','name']}]}]})
        const songsGetter = newAlbums.slice(0,100).map((album:AlbuminStats)=>album.songs[Math.floor(Math.random() * album.songs.length)]).flat(100).filter((song:Song)=>song).filter((song:Song)=>song.reproductions < 150).sort((a:Song, b:Song)=>a.reproductions - b.reproductions).slice(0,20);
        const shuffled = shuffle(songsGetter)
        return res.send(shuffled)
    } catch (e:any) {
        return res.send({message: e.message})
    }
})