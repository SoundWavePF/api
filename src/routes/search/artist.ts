import { Router } from 'express';
import db from '../../models/db'
import { Song } from '../../interfaces'

export const artistRouter = Router();

artistRouter.get('/all', async (_req, res) => {
    try {
        const artistsOnDb = await db.artist.findAll({
            attributes: { exclude: ['userId'] },
            include: [{ model: db.album, attributes: { exclude: ['artistId', 'genreId'] } }, { model: db.song, attributes: { exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'albumId', 'artistId', 'genreId'] } }]
        })
        res.send(artistsOnDb)
    } catch (e) {
        res.send({ message: e })
    }
})


artistRouter.get('/:artistId', async (req, res) => {
    const { artistId } = req.params;
    try {
        const artist = await db.artist.findOne({
            attributes: { exclude: ['userId'] },
            where: { id: artistId },
            include: [{ model: db.album, attributes: { exclude: ['artistId', 'genreId'] } }, { model: db.song, attributes: { exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'albumId', 'artistId', 'genreId'] } }]
        })
        res.send(artist)
    } catch (e) {
        res.send({ message: e })
    }
})

artistRouter.get('/:artistId/top', async (req, res) => {
    const { artistId } = req.params;
    try {
        const artist = await db.artist.findOne({
            where: { id: artistId },
            attributes: { exclude: ['userId'] },
            include: [{ model: db.album, attributes: { exclude: ['artistId', 'genreId'] } }, { model: db.song, attributes: { exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'albumId', 'artistId', 'genreId'] } }]
        })
        const artistTopSongs = artist.songs.sort((a: Song, b: Song) => b.reproductions - a.reproductions)
        if (artistTopSongs.length >= 10)
            res.send(artistTopSongs.slice(0, 10))
        else {
            res.send(artistTopSongs)
        }
    } catch (e) {
        res.send({ message: e })
    }


})