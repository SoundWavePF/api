import {Router} from "express";
import db from "../../models/db";
import {artistRouter} from "../search";

export const artistAlbumRouter = Router();

artistAlbumRouter.post('/create', async (req, res) => {
    const { userEmail, albumName, albumReleaseDate, image, genreId } = req.body;
    if(!albumName || !albumReleaseDate || !image || !genreId) {
        return res.send({message: 'Missing parameters'});
    }
    try {
        const user = await db.user.findOne({where: {email: userEmail}});
        const artist = await db.artist.findOne({where: {userId: user.id}});
        if(!artist) {
            return res.send({message: 'You are not an artist'});
        }
        const genre = await db.genre.findOne({where: {id: genreId}});
        const album = await db.album.create({
            name: albumName,
            artist: artist.name,
            release_date: albumReleaseDate,
            image_small: image,
            image_medium: image,
            image_big: image,
        })
        await artist.addAlbum(album);
        await genre.addAlbum(album);
        return res.send({message: 'Album created'});
    } catch (e:any) {
        return res.send({message: e.message});
    }
})

artistAlbumRouter.post('/delete', async (req, res) => {
    const { albumId, email } = req.body;
    if(!albumId || !email) {
        return res.send({message: 'Missing parameters'});
    }
    try {
        const user = await db.user.findOne({where: {email: email}});
        const artist = await db.artist.findOne({where: {userId: user.id}});
        if(!artist) {
            return res.send({message: 'You are not an artist'});
        }
        const album = await db.album.findOne({where: {id: albumId}, include: [{model: db.song}]});
        await Promise.all(album.songs.map(async (song: any) => {
            await song.destroy();
        }))
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
        const artist = await db.artist.findOne({where: {userId: user.id}});
        if(!artist) {
            return res.send({message: 'You are not an artist'});
        }
        const album = await db.album.findOne({where: {id: albumId}});
        if(album.artist !== artist.name) {
            return res.send({message: 'You are not the artist of this album'});
        }
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