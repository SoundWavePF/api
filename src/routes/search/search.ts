import { Router } from 'express';
import { Op } from 'sequelize'
import db from '../../models/db'
import { SearchResult, Datum, SongDatum } from "../../interfaces";

export const searchRouter = Router();

searchRouter.get('/', async (req, res) => {
    const { all } = req.query;
    let albumSearch: Datum[] = []
    let artistSearch: Datum[] = []
    let songSearch: SongDatum[] = []
    try {

        const song = await db.song.findAll({
            attributes: ['type', 'id', 'image_small', 'preview', 'name', 'reproductions', 'duration'],
            where: {
                name: {
                    [Op.iLike]: `${all}%`
                }
            },
            include: [
                { model: db.artist, attributes: ['id', 'dz_Id', 'name'], include: [{model: db.user, attributes: ['deactivated']}]  },
                { model: db.album, attributes: ['name', 'id'] }
            ]
        })
        song.map((e: any) => {
            let available = true;
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
                        name: e.name,
                        deactivated: e.user.deactivated
                    }
                }),
                album: e.album
            }
            if(obj.artists.find((e: any) => e.deactivated === true)){
                available = false;
            }
            if(available) {
                songSearch.push(obj)
            }
        })

        const album = await db.album.findAll({
            attributes: ['id', 'type', 'name', 'image_small'],
            where: {
                name: {
                    [Op.iLike]: `${all}%`
                }
            },
            include: [{ model: db.artist, attributes: ['id', 'dz_Id', 'name'], include: [{model: db.user, attributes: ['deactivated']}]}]
        })
        album.map((e: any) => {
            let available = true;
            const obj = {
                id: e.id,
                name: e.name,
                preview: e.preview,
                image_small: e.image_small,
                type: e.type,
                artists: e.artists.map((e: any) => {
                    return {
                        deactivated: e.user.deactivated
                    }
                })
            }
            if(obj.artists.find((e: any) => e.deactivated === true)){
                available = false;
            }
            if(available) {
            albumSearch.push(obj)
            }
        })

        const artist = await db.artist.findAll({
            attributes: ['id', 'type', 'name', 'image_small'],
            where: {
                name: {
                    [Op.iLike]: `${all}%`
                }
            },
            include: [{ model: db.user, attributes: ['deactivated']}]
        })
        artist.map((e: any) => {
            let available = true;
            const obj = {
                id: e.id,
                name: e.name,
                preview: e.preview,
                image_small: e.image_small,
                type: e.type,
                deactivated: e.user.deactivated
            }
            if(obj.deactivated === true){
                available = false;
            }
            if(available) {
            artistSearch.push(obj)
            }
        })

        const obj: SearchResult = {
            songData: songSearch.slice(0, 10),
            albumData: albumSearch.slice(0, 10),
            artistData: artistSearch.slice(0, 10),
        }
        res.send(obj)
    } catch (err) {
        res.send(err)
    }
})

searchRouter.get('/all', async (_req, res) => {
    let albumSearch!: Datum[];
    let artistSearch!: Datum[];
    let songSearch!: SongDatum[];
    try {
        albumSearch = await db.album.findAll({
            include: [
                { model: db.artist, attributes: ['id', 'dz_Id', 'name'], include: [{model: db.user, attributes: ['deactivated']}]}
            ]
        })
    }
    catch (e) {
        return res.send({ message: e })
    }
    try {
        artistSearch = await db.artist.findAll({
            include: [{model: db.user, attributes: ['deactivated']}]})
    } catch (e) {
        return res.send({ message: e })
    }
    try {
        songSearch = await db.song.findAll({
            attributes: { exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference'] },
            include: [
                { model: db.artist, attributes: ['id', 'dz_Id', 'name'], include: [{model: db.user, attributes: ['deactivated']}]  },
                { model: db.album, attributes: ['id', 'name'] }
            ]})
    } catch (e) {
        return res.send({ message: e })
    }

    const obj: SearchResult = {
        songData: songSearch.slice(0, 20),
        albumData: albumSearch.slice(0, 20),
        artistData: artistSearch.slice(0, 20),
    }

    return res.send(obj)
})