import { Router } from 'express';
import { Op } from 'sequelize'
import db from '../../models/db'
import { SearchResult, SongDatum, AlbumDatum, ArtistDatum } from "../../interfaces";

export const searchRouter = Router();

searchRouter.get('/', async (req, res) => {
    const { all } = req.query;
    let albumSearch!: AlbumDatum[];
    let artistSearch!: ArtistDatum[];
    let songSearch!: SongDatum[];
    try {
        albumSearch = await db.album.findAll({
            attributes: { exclude: ['artistId', 'genreId'] },
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
        res.send({ message: e })
    }
    try {
        artistSearch = await db.artist.findAll({
            attributes: { exclude: ['userId'] },
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
        res.send({ message: e })
    }
    try {
        songSearch = await db.song.findAll({
            attributes: { exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'albumId', 'artistId', 'genreId'] },
            where: {
                title: {
                    [Op.iLike]: `%${all}%`
                }
            },
            include: [
                { model: db.artist, attributes: { exclude: ['image_small', 'image_medium', 'image_big', 'userId'] } },
                //     db.Album,
                //     db.User,
                //     db.Playlist
            ]
        })
    } catch (e) {
        res.send({ message: e })
    }
    // const playlistSearch = await db.Playlist.findAll({
    //     where: {
    //         name: {
    //             [Op.iLike]: `%${all}%`
    //         }
    //     },
    //     // include: db.Song
    // })

    const obj: SearchResult = {
        songData: songSearch,
        albumData: albumSearch,
        artistData: artistSearch,
        // playlistData: playlistSearch
    }

    res.send(obj)
})

searchRouter.get('/all', async (_req, res) => {
    let albumSearch!: AlbumDatum[];
    let artistSearch!: ArtistDatum[];
    let songSearch!: SongDatum[];
    try {
        albumSearch = await db.album.findAll({
            attributes: { exclude: ['artistId', 'genreId'] },
            // include: [
            //     db.Artist,
            //     db.Song
            // ]
        })
    }
    catch (e) {
        res.send({ message: e })
    }
    try {
        artistSearch = await db.artist.findAll({
            attributes: { exclude: ['userId'] },
            // include: [
            //     db.User,
            //     db.Song,
            //     db.Album
            // ]
        })
    } catch (e) {
        res.send({ message: e })
    }
    try {
        songSearch = await db.song.findAll({
            attributes: { exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'albumId', 'artistId', 'genreId'] },
            include: [
                { model: db.artist, attributes: { exclude: ['image_small', 'image_medium', 'image_big', 'userId'] } },
                // db.Album,
                // db.User,
                // db.Playlist
            ]
        })
    } catch (e) {
        res.send({ message: e })
    }
    // const playlistSearch = await db.Playlist.findAll({
    //     // include: db.Song
    // })

    const obj = {
        songData: songSearch,
        albumData: albumSearch,
        artistData: artistSearch,
        // playlistData: playlistSearch
    }

    res.send(obj)
})