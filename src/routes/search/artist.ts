import { Router } from 'express';
import db from '../../models/db'
import { Song } from '../../interfaces'

export const artistRouter = Router();

artistRouter.get('/all', async (_req, res) => {
    try {
        const artistsOnDb = await db.artist.findAll({
            attributes: { exclude: ['userId'] },
            include: [{ model: db.album, attributes: { exclude: ['artistId', 'genreId'] } }, { model: db.song, attributes: { exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'AlbumId', 'artistId', 'genreId'] } }]
        })
        return res.send(artistsOnDb)
    } catch (e) {
        return res.send({ message: e })
    }
})


artistRouter.get('/:artistId', async (req, res) => {
    const { artistId } = req.params;
    try {
        const artist = await db.artist.findOne({
            where: { id: artistId },
            include: [{ model: db.album }, {
                model: db.song, include: [
                    { model: db.artist, attributes: ['id', 'dz_Id', 'name'] },
                    { model: db.album, attributes: ['name', 'id'] }
                ]
            }]
        })
        return res.send(artist)
        // include: [
        //     { model: db.artist, attributes: ['id', 'dz_Id', 'name'] },
        //     { model: db.album, attributes: ['name'] }
        // ]
    } catch (e) {
        return res.send({ message: e })
    }
})

artistRouter.get('/:artistId/top', async (req, res) => {
    const { artistId } = req.params;
    try {
        const artist = await db.artist.findOne({
            where: { id: artistId },
            attributes: { exclude: ['userId'] },
            include: [{ model: db.album, attributes: { exclude: ['artistId', 'genreId'] } }, { model: db.song, attributes: { exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'albumId'] }, include: [{ model: db.album, attributes: ['name'] }, { model: db.artist, attributes: ['name'] }] }]
        })
        const artistTopSongs = artist.songs.sort((a: Song, b: Song) => b.reproductions - a.reproductions)
        if (artistTopSongs.length >= 10)
            return res.send(artistTopSongs.slice(0, 10))
        else {
            return res.send(artistTopSongs)
        }
    } catch (e) {
        return res.send({ message: e })
    }


})
