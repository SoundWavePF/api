import {Router} from "express";
import db from "../../models/db";

export const artistStatsRouter = Router();

artistStatsRouter.post('/', async (req, res) => {
    const {email} = req.body;
    try {
        const user = await db.user.findOne({where: {email: email}});
        if (!user) {
            return res.send({message: 'User not found'});
        }
        if (user.rol !== 'artist') {
            return res.send({message: 'User is not an artist'});
        }
        const artist = await db.artist.findOne({where: {userId: user.id}, include: [{model: db.song, attributes: {exclude: ['artistId']}, include: [{model:db.artist, attributes:['name']}, {model:db.album, attributes:['name']}]}]});
        if (!artist) {
            return res.send({message: 'Artist not found'});
        }
        const albumsGetter = await db.album.findAll({where: {artist: artist.name}, include: [{model: db.song, attributes: {exclude: ['albumId']}}]});
        const songsGetter = albumsGetter.map((album:any)=>album.songs).flat(100).map((song:any)=>song.id);
        const songsInArtist = artist.songs.filter((song:any)=>songsGetter.includes(song.id));
        let totalPlayCount = songsInArtist.reduce((acc:any, song:any) => acc + song.reproductions, 0);
        let totalFavoriteCount = songsInArtist.reduce((acc:any, song:any) => acc + song.added_to_favorites, 0);
        let totalPlaylistCount = songsInArtist.reduce((acc:any, album:any) => acc + album.added_to_playlists, 0);
        let artistInfo = {
            id: artist.id,
            stripe_Id: artist.stripe_Id,
            name: artist.name,
            description: artist.description,
            image_small: artist.image_small,
            image_medium: artist.image_medium,
            image_big: artist.image_big,
            n_songs: songsGetter.length,
            songs: songsInArtist,
            n_albums: albumsGetter.length,
            albums: albumsGetter,
            totalPlayCount: totalPlayCount,
            totalFavoriteCount: totalFavoriteCount,
            totalPlaylistCount: totalPlaylistCount,
        }
    return res.send(artistInfo);
    } catch (e:any) {
        return res.send({message: e.message});
    }
})