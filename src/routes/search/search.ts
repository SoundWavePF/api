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
        albumSearch = await db.album.findAll({
            // attributes: {exclude: ['ArtistId', 'GenreId']},
            where: {
                name: {
                    [Op.iLike]: `%${all}%`
                }
            },
            // include: [
            //     db.artist,
            //     db.song
            // ]
        })
    } catch (e) {
        return res.send({message: e})
    }
    try{
        artistSearch = await db.artist.findAll({
            attributes: {exclude: ['UserId']},
            where: {
                name: {
                    [Op.iLike]: `%${all}%`
                }
            },
            // include: [
            //     db.User,
            //     db.song,
            //     db.album
            // ]
        })
    } catch (e) {
        return res.send({message: e})
    }
    try {
        songSearch = await db.song.findAll({
            attributes :{exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference']},
            where: {
                name: {
                    [Op.iLike]: `%${all}%`
                }
            },
            include: [
                {model: db.artist, attributes: ['id', 'dz_Id', 'name']},
                {model: db.album, attributes: ['name']}
                //     db.User,
                //     db.playlist
            ]
        })
    } catch (e:any) {
        return res.send({message: e.message})
    }
    // const playlistSearch = await db.playlist.findAll({
    //     where: {
    //         name: {
    //             [Op.iLike]: `%${all}%`
    //         }
    //     },
    //     // include: db.song
    // })

    const obj:SearchResult = {
        songData: songSearch,
        albumData: albumSearch,
        artistData: artistSearch,
        // playlistData: playlistSearch
        }

    return res.send(obj)
})

searchRouter.get('/all', async(_req, res)=>{
    let albumSearch!:AlbumDatum[];
    let artistSearch!: ArtistDatum[];
    let songSearch!: SongDatum[];
    try{
        albumSearch = await db.album.findAll({
            // attributes :{exclude: ['ArtistId', 'GenreId']},
            // include: [
            //     db.artist,
            //     db.song
            // ]
        })
    }
    catch (e) {
        return res.send({message: e})
    }
    try{
        artistSearch = await db.artist.findAll({
            // attributes: {exclude: ['userId']},
            // include: [
            //     db.User,
            //     db.song,
            //     db.album
            // ]
        })
    } catch (e) {
        return res.send({message: e})
    }
    try{
        songSearch = await db.song.findAll({
            attributes :{exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference']},
            include: [
                {model: db.artist, attributes: ['id', 'dz_Id', 'name']},
                {model: db.album, attributes: ['name']}
                // db.User,
                // db.playlist
            ]
        })
    } catch (e) {
        return res.send({message: e})
    }
    // const playlistSearch = await db.playlist.findAll({
    //     // include: db.song
    // })

    const obj = {
        songData: songSearch,
        albumData: albumSearch,
        artistData: artistSearch,
        // playlistData: playlistSearch
    }

    return res.send(obj)
})