import {Router} from "express";
import db from '../../models/db'
import genres from './genres.json'
const { Genre, Artist, Song } = db;
const app = Router();


app.get('/', async (_req, res)=>{
    genres.map(async (genre: any) => {
        await Genre.findOrCreate({
            where: {"dz_Id": genre.dz_Id},
            defaults: {
                "dz_Id": genre.dz_Id,
                "name": genre.name,
                "type": genre.type,
            }
        })
    })
    res.send('Genre')
})

export default app;