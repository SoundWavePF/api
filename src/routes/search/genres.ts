import {Router} from 'express';
import db from '../../models/db'

export const genreRouter = Router();

genreRouter.get('/all', async(_req, res)=>{
    try{
        const genre = await db.Genre.findAll({
            include: [{model: db.Album, attributes :{exclude: ['ArtistId', 'GenreId']}, include: db.Artist}]
        })
        res.send(genre)
    } catch (e){
        res.send({error: e})
    }
})


genreRouter.get('/:genreId', async(req, res)=>{
    const { genreId } = req.params;
    try{
        const genre = await db.Genre.findOne({
            where: {id: genreId},
            include: [{model: db.Album, attributes :{exclude: ['ArtistId', 'GenreId']}, include: db.Artist}]
        })
        res.send(genre)
    } catch (e) {
        res.send({error: e})
    }
})