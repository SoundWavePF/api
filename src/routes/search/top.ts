import { Router } from 'express';
import db from '../../models/db';
import {Song} from "../../interfaces";
// const { Song } = db

export const topRouter = Router();

topRouter.get('/', async(_req, res)=>{
    try {
        const songs = await db.song.findAll({
            attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'GenreId']},
            include: [{model:db.artist, attributes: {exclude: ['image_small', 'image_medium', 'image_big', 'userId']}}]
        })
        let sorted = songs.sort((a: Song, b: Song) => b.reproductions - a.reproductions)
        res.send(sorted)
    } catch (e) {
        res.send({message: e})
    }
})