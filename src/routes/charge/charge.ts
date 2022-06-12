import {Router} from "express";
import db from '../../models/db'
import artist from './artistDb.json';
import song from './songDb.json';
import artistSong from './ArtistSongDb.json';
const { ArtistSong, Artist, Song } = db;
const app = Router()


app.get('/', async (_req, res)=>{
    artist.map(async (artist: any) => {
        await Artist.findOrCreate({
            where: {"dz_Id": artist.dz_Id},
            defaults: {
                "dz_Id": artist.dz_Id,
                "name": artist.name,
                "image_small": artist.image_small,
                "image_medium": artist.image_medium,
                "image_big": artist.image_big,
                "type": artist.type
            }
        })
    })
    song.map(async (song: any) => {
        await Song.findOrCreate({
            where: {"dz_Id": song.dz_Id},
            defaults: {
                "dz_Id": song.dz_Id,
                "title": song.title,
                "artist": song.artist,
                "preview": song.preview,
                "image_small": song.image_small,
                "image_medium": song.image_medium,
                "image_big": song.image_big,
                "reproductions": 0,
                "duration": song.duration,
                "genre": song.genre,
                "album": song.album,
                "type": song.type,
                "artist_id_reference": song.artist_id_reference,
                "genre_id_reference": song.genre_id_reference,
                "album_id_reference": song.album_id_reference
            }
        })
    })
    artistSong.map(async (artist: any) => {
        await ArtistSong.findOrCreate({
            where: {"idArtist": artist.idArtist, "id_song_reference": artist.id_song_reference},
            defaults: {
                "idArtist": artist.idArtist,
                "nameArtist": artist.nameArtist,
                "id_song_reference": artist.id_song_reference
            }
        })
    })
    const artistIdDb = await ArtistSong.findAll()
    artistIdDb.map(async (artist: any) => {
        const artistDb = await Artist.findOne({where : {dz_Id: artist.idArtist}})
        const songDb = await Song.findOne({where : {dz_Id: artist.id_song_reference}})
        await songDb.addArtist(artistDb)
    })
    res.send('Artist')
    // res.send(artistId)
    // ArtistSong.findAll().then((result: any) => res.send(result))
})

export default app;