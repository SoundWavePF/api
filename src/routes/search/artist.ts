import {Router} from 'express';
import db from '../../models/db'
import {Song} from '../../interfaces'

export const artistRouter = Router();

artistRouter.get('/all', async(_req, res)=>{
    try{
        const artistsOnDb = await db.Artist.findAll({
            attributes: {exclude: ['UserId']},
            include: [{model: db.Album, attributes :{exclude: ['ArtistId', 'GenreId']}}, {model: db.Song, attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'ArtistId', 'GenreId']}}]
        })
        res.send(artistsOnDb)
    } catch (e) {
        res.send({message: e})
    }
})


artistRouter.get('/:artistId', async(req, res)=>{
    const { artistId } = req.params;
    try{
        const artist = await db.Artist.findOne({
            attributes: {exclude: ['UserId']},
            where: {id: artistId},
            include: [{model: db.Album, attributes :{exclude: ['ArtistId', 'GenreId']}}, {model: db.Song, attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'ArtistId', 'GenreId']}}]
        })
        res.send(artist)
    } catch (e) {
        res.send({message: e})
    }
})

artistRouter.get('/:artistId/top', async(req, res)=>{
    const { artistId } = req.params;
    try{
        const artist = await db.Artist.findOne({
            where: {id: artistId},
            attributes: {exclude: ['UserId']},
            include: [{model: db.Album, attributes :{exclude: ['ArtistId', 'GenreId']}}, {model: db.Song, attributes: {exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'ArtistId', 'GenreId']}}]
        })
        const artistTopSongs = artist.Songs.sort((a:Song, b:Song) => b.reproductions - a.reproductions)
        if(artistTopSongs.length >= 10)
            res.send(artistTopSongs.slice(0, 10))
        else{
            res.send(artistTopSongs)
        }
    } catch (e) {
        res.send({message: e})
    }


})