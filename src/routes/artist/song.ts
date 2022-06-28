import {Router} from "express";
import db from "../../models/db";

export const artistSongRouter = Router();

artistSongRouter.post('/create', async (req, res) => {
    const { userEmail, songName, duration, preview, albumId, albumName } = req.body;

    if(!userEmail || !songName || !duration || !preview) {
        return res.send({message: 'Missing parameters'});
    }
    try {
        const user = await db.user.findOne({where: {email: userEmail}});
        const artist = await db.artist.findOne({where: {userId: user.id}});
        const song = await db.song.create({
            name: songName,
            preview: preview,
            duration: Math.floor(duration),
            type: "track"
        })
        let album;
        if (albumName) {
            album = await db.album.findOrCreate({
                where: {name: albumName},
                name: albumName,
                artist: artist.name,
                release_date: new Date().toISOString().split('T')[0],
            })
        } else if (albumId) {
            album = await db.album.findOne({where: {id: albumId}});
        } else {
            album = await db.album.findOrCreate({
                where: {name: albumName},
                name: `${songName} - Single`,
                artist: artist.name,
                release_date: new Date().toISOString().split('T')[0],
                // image_small: image,
                // image_medium: image,
                // image_big: image,
            })
        }
        await artist.addSong(song);
        await artist.addAlbum(album);
        await song.setAlbum(album);
        await song.update({
            image_small: album.image_small,
            image_medium: album.image_medium,
            image_big: album.image_big,
        })
        return res.send({message: 'Song created'});
    } catch (e:any) {
        return res.send({message: e.message});
    }
})


artistSongRouter.post('/delete', async (req, res) => {
    const { songId, email } = req.body;
    if(!songId || !email) {
        return res.send({message: 'Missing parameters'});
    }
    try {
        const user = await db.user.findOne({where: {email: email}});
        const songD = await db.song.findOne({where: {id: songId}, include: [{model: db.album, include: [{model: db.artist}]}]});
        const artist = await db.artist.findOne({where: {userId: user.id}});
        if(songD.album.artist.id !== artist.id) {
            return res.send({message: 'You are not the artist of this song'});
        }
        await artist.removeSong(songD);
        if(songD.album.name.includes("- Single")){
            await songD.destroy();
            const album = await db.album.findOne({where: {id: songD.album.id}});
            await album.destroy();
        } else {
            await songD.destroy();
        }
        return res.send({message: 'Song deleted'});
    } catch (e:any) {
        return res.send({message: e.message});
    }
})

artistSongRouter.post('/update', async (req, res) => {
    const {email, songId, songName, albumId} = req.body;
    try {
        if(!songId || !songName || !albumId) {
            return res.send({message: 'Missing parameters'});
        }
        const user = await db.user.findOne({where: {email: email}});
        const artist = await db.artist.findOne({where: {userId: user.id}});
        const song = await db.song.findOne({where: {id: songId}});
        const albumOld = await db.album.findOne({where: {id: song.albumId}});
        if(albumOld.artist !== artist.name){
            return res.send({message: 'You are not the artist of this song'});
        }
        albumOld.removeSong(song);
        const albumNew = await db.album.findOne({where: {id: albumId}});
        albumNew.addSong(song);
        await song.update({
            name: songName || song.name,
            image_small: albumNew.image_small,
            image_medium: albumNew.image_medium,
            image_big: albumNew.image_big,
        })
        return res.send({message: 'Song updated'});
        } catch (e:any) {
        return res.send({message: e.message});
    }
})
