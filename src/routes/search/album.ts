import {Router} from 'express';
import db from '../../models/db'
import {AlbumResult} from "../../interfaces";

export const albumRouter = Router();

albumRouter.get('/all', async(_req, res)=>{
    try{
        const albumsOnDb:AlbumResult = await db.album.findAll({
            attributes :{exclude: ['ArtistId', 'GenreId']},
            include: [{model: db.artist, attributes: {exclude: ['UserId']}}, db.genre, {model: db.song, attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'ArtistId', 'GenreId', 'UserId']}}]
        })
        return res.send(albumsOnDb)
    } catch (e:any) {
        return res.send({message: e.message})
    }
})


albumRouter.get('/:albumId', async(req, res)=>{
    const { albumId } = req.params;
    const albumsOnDb:AlbumResult = await db.album.findOne({
        attributes :{exclude: ['ArtistId', 'GenreId']},
        where: {id: albumId},
        include: [{model: db.artist, attributes: {exclude: ['UserId']}}, db.genre, {model: db.song, attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'ArtistId', 'GenreId', 'UserId']}}]
    })
    res.send(albumsOnDb)
})