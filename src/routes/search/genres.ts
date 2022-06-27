import {Router} from 'express';
import db from '../../models/db'

export const genreRouter = Router();

genreRouter.get('/all', async(_req, res)=>{
    try{
        const genre = await db.genre.findAll()
        return res.send(genre)
    } catch (e){
        return res.send({error: e})
    }
})


genreRouter.get('/:genreId', async(req, res)=>{
    const { genreId } = req.params;
    try{
        const genre = await db.genre.findOne({
            where: {id: genreId},
            include: [{model: db.album, attributes :{exclude: ['artistId', 'genreId']}, include: db.artist}]
        })
        return res.send(genre)
    } catch (e) {
        return res.send({error: e})
    }
})