import {Router} from 'express';
import db from '../../models/db'
import {Song} from '../../interfaces'

export const artistRouter = Router();

artistRouter.get('/all', async(_req, res)=>{
    const artistsOnDb = await db.Artist.findAll({
        include: [{model: db.Album, attributes :{exclude: ['ArtistId', 'GenreId']}}, {model: db.Song, attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'ArtistId', 'GenreId']}}]
    })
    res.send(artistsOnDb)
})


artistRouter.get('/:artistId', async(req, res)=>{
    const { artistId } = req.params;
    const artist = await db.Artist.findOne({
        where: {id: artistId},
        include: [{model: db.Album, attributes :{exclude: ['ArtistId', 'GenreId']}}, {model: db.Song, attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'ArtistId', 'GenreId']}}]
    })
    res.send(artist)
})

artistRouter.get('/:artistId/top', async(req, res)=>{
    const { artistId } = req.params;
    const artist = await db.Artist.findOne({
        where: {id: artistId},
        include: [{model: db.Album, attributes :{exclude: ['ArtistId', 'GenreId']}}, {model: db.Song, attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'ArtistId', 'GenreId']}}]
    })
    const artistTopSongs = artist.Songs.sort((a:Song, b:Song) => b.reproductions - a.reproductions)
    if(artistTopSongs.length >= 10)
        res.send(artistTopSongs.slice(0, 10))
    else{
        res.send(artistTopSongs)
    }
})