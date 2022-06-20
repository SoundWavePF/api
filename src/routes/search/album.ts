import { Router } from 'express';
import db from '../../models/db'
import { AlbumResult } from "../../interfaces";

export const albumRouter = Router();

albumRouter.get('/all', async (_req, res) => {
    try {
        const albumsOnDb: AlbumResult = await db.album.findAll({
            attributes: { exclude: ['artistId', 'genreId'] },
            include: [{ model: db.artist, attributes: { exclude: ['userId'] } },
            db.genre, {
                model: db.song, include: [
                    { model: db.artist, attributes: ['id', 'dz_Id', 'name'] },
                    { model: db.album, attributes: ['name', 'id'] }
                ]
            }]
        })
        return res.send(albumsOnDb)
    } catch (e: any) {
        return res.send({ message: e.message })
    }
})


albumRouter.get('/:albumId', async (req, res) => {
    const { albumId } = req.params;
    try {
        const albumsOnDb: AlbumResult = await db.album.findOne({
            attributes: { exclude: ['artistId', 'genreId'] },
            where: { id: albumId },
            include: [{ model: db.artist, attributes: { exclude: ['userId'] } }, db.genre, { model: db.song, attributes: { exclude: ['artist_id_reference', 'genre_id_reference', 'album_id_reference', 'albumId', 'artistId', 'genreId', 'userId'] }, include: [{ model: db.album, attributes: ['name'] }, { model: db.artist, attributes: ['name'] }] }]
        })
        return res.send(albumsOnDb)
    } catch (e: any) {
        return res.send({ message: e.message })

    }


})