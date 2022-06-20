import {Router} from "express";
import db from "../../models/db";
import {artistRouter} from "../search";

export const artistAlbumRouter = Router();

artistAlbumRouter.post('/create', async (req, res) => {
    const { userEmail, albumName, albumReleaseDate, image, genreId } = req.body;
    try {
        const user = await db.user.findOne({where: {email: userEmail}});
        const artist = await db.artist.findOne({where: {userId: user.id}});
        const genre = await db.genre.findOne({where: {id: genreId}});
        const album = await db.album.create({
            name: albumName,
            release_date: albumReleaseDate,
            image_small: image,
            image_medium: image,
            image_big: image,
        })
        await artist.addAlbum(album);
        await album.setGenre(genre);
        return res.send({message: 'Album created'});
    } catch (e:any) {
        return res.send({message: e.message});
    }
})

artistAlbumRouter.post('/delete', async (req, res) => {
    const { albumId, email } = req.body;
    try {
        const user = await db.user.findOne({where: {email: email}});
        const album = await db.album.findOne({where: {id: albumId}});
        const artist = await db.artist.findOne({where: {userId: user.id}});
        await artist.removeAlbum(album);
        await album.destroy();
        return res.send({message: 'Album deleted'});
    } catch (e:any) {
        return res.send({message: e.message});
    }
})

artistAlbumRouter.post('/update', async (req, res) => {
    const {email, albumId, albumName, albumReleaseDate, image, genreId} = req.body;
    try {
        const user = await db.user.findOne({where: {email: email}});
        const album = await db.album.findOne({where: {id: albumId}});
        const genre = await db.genre.findOne({where: {id: genreId}});
        await album.update({
            name: albumName || album.name,
            release_date: albumReleaseDate || album.release_date,
            image_small: image || album.image_small,
            image_medium: image || album.image_medium,
            image_big: image || album.image_big,
        })
        return res.send({message: 'Album updated'});
    } catch (e:any) {
    return res.send({message: e.message});
    }
})