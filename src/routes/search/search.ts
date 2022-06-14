import { Router } from 'express';
import { Op } from 'sequelize'
import db from '../../models/db'
import {SearchResult, SongDatum, AlbumDatum, ArtistDatum} from "../../interfaces";

export const searchRouter = Router();

searchRouter.get('/', async (req, res) => {
    const { all } = req.query;
    let albumSearch!:AlbumDatum[];
    let artistSearch!: ArtistDatum[];
    let songSearch!: SongDatum[];
    try {
        albumSearch = await db.Album.findAll({
            attributes: {exclude: ['ArtistId', 'GenreId']},
            where: {
                name: {
                    [Op.iLike]: `%${all}%`
                }
            },
            // include: [
            //     db.Artist,
            //     db.Song
            // ]
        })
    } catch (e) {
        res.send({message: e})
    }
    try{
        artistSearch = await db.Artist.findAll({
            attributes: {exclude: ['UserId']},
            where: {
                name: {
                    [Op.iLike]: `%${all}%`
                }
            },
            // include: [
            //     db.User,
            //     db.Song,
            //     db.Album
            // ]
        })
    } catch (e) {
        res.send({message: e})
    }
    try {
        songSearch = await db.Song.findAll({
            attributes :{exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'ArtistId', 'GenreId']},
            where: {
                title: {
                    [Op.iLike]: `%${all}%`
                }
            },
            include: [
                {model: db.Artist, attributes: {exclude:['image_small', 'image_medium', 'image_big', 'UserId']}},
                //     db.Album,
                //     db.User,
                //     db.Playlist
            ]
        })
    } catch (e) {
        res.send({message: e})
    }
    // const playlistSearch = await db.Playlist.findAll({
    //     where: {
    //         name: {
    //             [Op.iLike]: `%${all}%`
    //         }
    //     },
    //     // include: db.Song
    // })

    const obj:SearchResult = {
        songData: songSearch,
        albumData: albumSearch,
        artistData: artistSearch,
        // playlistData: playlistSearch
        }

    res.send(obj)
})

<<<<<<< HEAD
searchRouter.get('/all', async (_req, res) => {
    const albumSearch = await db.Album.findAll({
        include: [
            db.Artist,
            db.Song
        ]
    })
    const artistSearch = await db.Artist.findAll({
        include: [
            db.User,
            db.Song,
            db.Album
        ]
    })

    const SongSearch = await db.Song.findAll({
        include: [
            db.Artist,
            db.Album,
            db.User,
            db.Playlist
        ]
    })

    const playlistSearch = await db.Playlist.findAll({
        include: db.Song
    })
=======
searchRouter.get('/all', async(_req, res)=>{
    let albumSearch!:AlbumDatum[];
    let artistSearch!: ArtistDatum[];
    let songSearch!: SongDatum[];
    try{
        albumSearch = await db.Album.findAll({
            attributes :{exclude: ['ArtistId', 'GenreId']},
            // include: [
            //     db.Artist,
            //     db.Song
            // ]
        })
    }
    catch (e) {
        res.send({message: e})
    }
    try{
        artistSearch = await db.Artist.findAll({
            attributes: {exclude: ['UserId']},
            // include: [
            //     db.User,
            //     db.Song,
            //     db.Album
            // ]
        })
    } catch (e) {
        res.send({message: e})
    }
    try{
        songSearch = await db.Song.findAll({
            attributes :{exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'ArtistId', 'GenreId']},
            include: [
                {model: db.Artist, attributes: {exclude:['image_small', 'image_medium', 'image_big', 'UserId']}},
                // db.Album,
                // db.User,
                // db.Playlist
            ]
        })
    } catch (e) {
        res.send({message: e})
    }
    // const playlistSearch = await db.Playlist.findAll({
    //     // include: db.Song
    // })
>>>>>>> development

    const obj = {
        songData: songSearch,
        albumData: albumSearch,
        artistData: artistSearch,
        // playlistData: playlistSearch
    }

    res.send(obj)
})