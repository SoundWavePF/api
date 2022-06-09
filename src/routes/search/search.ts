import {Router} from 'express';
import {Op} from 'sequelize'
import db from '../../models/db'

export const searchRouter = Router();

searchRouter.get('/', async(req, res)=>{
    const { all } = req.query;
    const albumSearch = await db.Album.findAll({
        where: {
            name: {
                [Op.iLike]: `%${all}%`
            }
        },
        include: [
            db.Artist,
            db.Song
        ]
    })
    const artistSearch = await db.Artist.findAll({
        where: {
            name: {
                [Op.iLike]: `%${all}%`
            }
        },
        include: [
            db.User,
            db.Song,
            db.Album
        ]
    })

    const SongSearch = await db.Song.findAll({
        where: {
            title: {
                [Op.iLike]: `%${all}%`
            }
        },
        include: [
            db.Artist,
            db.Album,
            db.User,
            db.Playlist
        ]
    })

    const obj = {
        songData: SongSearch,
        albumData: albumSearch,
        artistData: artistSearch
    }

    res.send(obj)
})

searchRouter.get('/all', async(_req, res)=>{
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

    const obj = {
        songData: SongSearch,
        albumData: albumSearch,
        artistData: artistSearch
    }

    res.send(obj)
})