import { Router } from 'express';
import { Op } from 'sequelize'
import db from '../../models/db'
import { SearchResult, SongDatum, AlbumDatum, ArtistDatum } from "../../interfaces";

export const searchRouter = Router();

searchRouter.get('/', async (req, res) => {
    const { all } = req.query;
    let albumSearch: any[] = []
    let artistSearch: any[] = []
    let songSearch: any[] = []
    try {

        const song = await db.song.findAll({
            attributes: ['type', 'id', 'image_small', 'preview', 'name', 'reproductions', 'duration'],
            where: {
                name: {
                    [Op.iLike]: `${all}%`
                }
            },
            include: [
                { model: db.artist, attributes: ['id', 'dz_Id', 'name'] },
                { model: db.album, attributes: ['name'] }
            ]
        })
        song.map((e: any) => {
            const obj = {
                id: e.id,
                name: e.name,
                preview: e.preview,
                image_small: e.image_small,
                type: e.type,
                reproductions: e.reproductions,
                duration: e.duration,
                artists: e.artists.map((e: any) => {
                    return {
                        id: e.id,
                        dz_Id: e.dz_Id,
                        name: e.name
                    }
                }),
                album: e.album
            }
            songSearch.push(obj)
        })

        const album = await db.album.findAll({
            attributes: ['id', 'type', 'name', 'image_small'],
            where: {
                name: {
                    [Op.iLike]: `${all}%`
                }
            },
        })
        album.map((e: any) => {
            const obj = {
                id: e.id,
                name: e.name,
                preview: e.preview,
                image_small: e.image_small,
                type: e.type,
            }
            albumSearch.push(obj)
        })

        const artist = await db.artist.findAll({
            attributes: ['id', 'type', 'name', 'image_small'],
            where: {
                name: {
                    [Op.iLike]: `${all}%`
                }
            },
        })
        artist.map((e: any) => {
            const obj = {
                id: e.id,
                name: e.name,
                preview: e.preview,
                image_small: e.image_small,
                type: e.type,
            }
            artistSearch.push(obj)
        })

        const obj = {
            songData: songSearch.slice(0, 3),
            albumData: albumSearch.slice(0, 3),
            artistData: artistSearch.slice(0, 3),
        }
        res.send(obj)
    } catch (err) {
        res.send(err)
    }
})

searchRouter.get('/all', async (_req, res) => {
    let albumSearch!: AlbumDatum[];
    let artistSearch!: ArtistDatum[];
    let songSearch!: SongDatum[];
    try {
        albumSearch = await db.album.findAll({
            // attributes :{exclude: ['ArtistId', 'GenreId']},
            // include: [
            //     db.artist,
            //     db.song
            // ]
        })
    }
    catch (e) {
        return res.send({ message: e })
    }
    try {
        artistSearch = await db.artist.findAll({
            // attributes: {exclude: ['userId']},
            // include: [
            //     db.User,
            //     db.song,
            //     db.album
            // ]
        })
    } catch (e) {
        return res.send({ message: e })
    }
    try {
        songSearch = await db.song.findAll({
            attributes: { exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference'] },
            include: [
                { model: db.artist, attributes: ['id', 'dz_Id', 'name'] },
                { model: db.album, attributes: ['name'] }
                // db.User,
                // db.playlist
            ]
        })
    } catch (e) {
        return res.send({ message: e })
    }
    // const playlistSearch = await db.playlist.findAll({
    //     // include: db.song
    // })

    const obj = {
        songData: songSearch.slice(0, 20),
        albumData: albumSearch.slice(0, 20),
        artistData: artistSearch.slice(0, 20),
        // playlistData: playlistSearch
    }

    return res.send(obj)
})