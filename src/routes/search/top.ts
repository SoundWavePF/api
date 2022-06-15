import { Router } from 'express';
import db from '../../models/db';
import {Song} from "../../interfaces";
// const { Song } = db

export const topRouter = Router();

topRouter.get('/', async(_req, res)=>{
    try {
        const songs = await db.song.findAll({
            attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference']},
            include: [{model:db.artist, attributes: {exclude: ['image_small', 'image_medium', 'image_big', 'userId']}}, {model: db.album, attributes: ['name']}]
        })
        let sorted = songs.sort((a: Song, b: Song) => b.reproductions - a.reproductions)
        return res.send(sorted)
    } catch (e) {
        return res.send({message: e})
    }
})