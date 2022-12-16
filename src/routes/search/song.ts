import {Router} from "express";
import db from "../../models/db";

export const songRouter = Router();

songRouter.get('/:songId', async (req, res) => {
    const {songId} = req.params;
    try {
        const song = await db.song.findOne({where: {dz_Id: songId}, include: [{model: db.artist, attributes: {exclude: ['userId']}}, {model: db.album, attributes: {exclude: ['artistId', 'genreId']}}]});
        if(!song) {
            return res.send({message: 'Song not found'});
        }
        return res.send(song);
    } catch (e:any) {
        return res.send({message: e.message});
    }
})