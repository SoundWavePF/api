import {Router} from 'express';
import db from '../../models/db'

export const albumRouter = Router();

albumRouter.get('/all', async(_req, res)=>{
    const albumsOnDb = await db.Album.findAll({
        attributes :{exclude: ['ArtistId', 'GenreId']},
        include: [db.Artist, db.Genre, {model: db.Song, attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'ArtistId', 'GenreId']}}]
    })
    res.send(albumsOnDb)
})


albumRouter.get('/:albumId', async(req, res)=>{
    const { albumId } = req.params;
    const artist = await db.Album.findOne({
        attributes :{exclude: ['ArtistId', 'GenreId']},
        where: {id: albumId},
        include: [db.Artist, db.Genre, {model: db.Song, attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'ArtistId', 'GenreId']}}]
    })
    res.send(artist)
})