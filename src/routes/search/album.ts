import {Router} from 'express';
import db from '../../models/db'
import {AlbumResult} from "../../interfaces";

export const albumRouter = Router();

albumRouter.get('/all', async(_req, res)=>{
    try{
        const albumsOnDb:AlbumResult = await db.Album.findAll({
            attributes :{exclude: ['ArtistId', 'GenreId']},
            include: [{model: db.Artist, attributes: {exclude: ['UserId']}}, db.Genre, {model: db.Song, attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'ArtistId', 'GenreId', 'image_small', 'image_medium', 'image_big', 'UserId']}}]
        })
        res.send(albumsOnDb)
    } catch (e) {
        res.send({message: e})
    }
})


albumRouter.get('/:albumId', async(req, res)=>{
    const { albumId } = req.params;
    const albumsOnDb:AlbumResult = await db.Album.findOne({
        attributes :{exclude: ['ArtistId', 'GenreId']},
        where: {id: albumId},
        include: [{model: db.Artist, attributes: {exclude: ['UserId']}}, db.Genre, {model: db.Song, attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'ArtistId', 'GenreId', 'image_small', 'image_medium', 'image_big', 'UserId']}}]
    })
    res.send(albumsOnDb)
})