import {Router} from "express";
import db from "../../models/db";
import {ArtistInAlbum} from "../../interfaces";

export const artistSongRouter = Router();

artistSongRouter.post('/create', async (req, res) => {
    const { userEmail, songName, duration, preview, albumId } = req.body;

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
        let createdAlbum;
        if (albumId) {
            album = await db.album.findOne({where: {id: albumId}});
        } else {
            album = await db.album.create({
                name: `${songName} - Single`,
                artist: artist.name,
                release_date: new Date().toISOString().split('T')[0],
            })
        }
        if (createdAlbum) {
            await artist.addSong(song);
            await artist.addAlbum(album);
            await song.setAlbum(album);
            await song.update({
                image_small: album.image_small,
                image_medium: album.image_medium,
                image_big: album.image_big,
            })
            return res.send({message: 'Song created'});
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
        if(!user) {
            return res.send({message: 'User not found'});
        }
        const songD = await db.song.findOne({where: {id: songId}, include: [{model: db.album, include: [{model: db.artist}]}]});
        if(!songD) {
            return res.send({message: 'Song not found'});
        }
        const artist = await db.artist.findOne({where: {userId: user.id}});
        if(!artist) {
            return res.send({message: 'Artist not found'});
        }
        let artistChecker = songD.album.artists.filter((artistInAlbum: ArtistInAlbum) => artistInAlbum.id === artist.id);
        if(artistChecker.length === 0) {
            return res.send({message: 'You are not the artist of this song'});
        }
        const played = await db.played.findOne({where: {songId: songId}});
        if(played) {
            await played.destroy();
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
        if(!user) {
            return res.send({message: 'User not found'});
        }
        const artist = await db.artist.findOne({where: {userId: user.id}});
        if(!artist) {
            return res.send({message: 'Artist not found'});
        }
        const song = await db.song.findOne({where: {id: songId}});
        if(!song) {
            return res.send({message: 'Song not found'});
        }
        const albumOld = await db.album.findOne({where: {id: song.albumId}, include: [{model: db.artist}]});
        const artistInAlbum = albumOld.artists.filter((artistInAlbum: ArtistInAlbum) => artistInAlbum.id === artist.id);
        if(artistInAlbum.length === 0) {
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

artistSongRouter.post('/createAlbum', async (req, res) => {
    const { userEmail, songs, albumName } = req.body;
    if(!userEmail || !songs || !albumName) {
        return res.send({message: 'Missing parameters'});
    }
    try {
        const user = await db.user.findOne({where: {email: userEmail}});
        const artist = await db.artist.findOne({where: {userId: user.id}});
        const albumsCreated = await db.album.create({
            name: albumName,
            artist: artist.name,
            release_date: new Date().toISOString().split('T')[0],
        })
        await Promise.all(songs.map(async (song:any) => {
            const songCreated = await db.song.create({
                name: song.songName,
                preview: song.preview,
                duration: Math.floor(song.duration),
                type: "track"
            })
            await artist.addSong(songCreated);
            await albumsCreated.addSong(songCreated);
            await songCreated.setAlbum(albumsCreated);
            await songCreated.update({
                image_small: albumsCreated.image_small,
                image_medium: albumsCreated.image_medium,
                image_big: albumsCreated.image_big,
            })
        }))
        await artist.addAlbum(albumsCreated);
        return res.send({message: 'Songs created with album'});
    } catch (e:any) {
        return res.send({message: e.message});
    }

})
