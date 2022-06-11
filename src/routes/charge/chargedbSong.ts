import {Router} from "express";
import axios from 'axios';
import idArtist from '../idArtist.json';
import db from '../../models/db'
const app = Router()
const { Song, Artist } = db;

app.get('/dbsongs1', async (_req, res)=>{
    
    Promise.all(idArtist[0].map((id: any) => axios.get(`https://api.deezer.com/artist/${id}/top?limit=10`)))
        .then(songs => {
            songs.map((song: any)=> { 
                song.data.data.map(async (song: any) => {
                    const songId: number = song.id
                    song.contributors.map(async (artist: any) => {
                        await db.ArtistId.findOrCreate({
                            where: {"idArtist": artist.id, "id_song_reference": songId},
                            defaults: {
                            "idArtist": artist.id,
                            "nameArtist": artist.name,
                            "id_song_reference": songId
                            }
                        })
                    })
                        await db.Song.findOrCreate({
                            where: {"dz_Id": song.id},
                            defaults: {
                                "dz_Id": song.id,
                                "title": song.title,
                                "artist": song.artist.name,
                                "preview": song.preview,
                                "image_small": song.album.cover_small,
                                "image_medium": song.album.cover_medium,
                                "image_big": song.album.cover_big,
                                "reproductions": 0,
                                "duration": song.duration,
                                "genre": 'Pop',
                                "album": song.album.title,
                                "type": song.type,
                                "artist_id_reference": song.artist.id,
                                "genre_id_reference": 132,
                                "album_id_reference": song.album.id
                            }
                            })
                })
            })
        })
    Promise.all(idArtist[1].map((id: any) => axios.get(`https://api.deezer.com/artist/${id}/top?limit=10`)))
    .then(songs => {
        songs.map((song: any)=> { 
            song.data.data.map(async (song: any) => {
                const songId: number = song.id
                song.contributors.map(async (artist: any) => {
                    await db.ArtistId.findOrCreate({
                        where: {"idArtist": artist.id, "id_song_reference": songId},
                        defaults: {
                        "idArtist": artist.id,
                        "nameArtist": artist.name,
                        "id_song_reference": songId
                        }
                    })
                })
                    await db.Song.findOrCreate({
                        where: {"dz_Id": song.id},
                        defaults: {
                            "dz_Id": song.id,
                            "title": song.title,
                            "artist": song.artist.name,
                            "preview": song.preview,
                            "image_small": song.album.cover_small,
                            "image_medium": song.album.cover_medium,
                            "image_big": song.album.cover_big,
                            "reproductions": 0,
                            "duration": song.duration,
                            "genre": 'Pop',
                            "album": song.album.title,
                            "type": song.type,
                            "artist_id_reference": song.artist.id,
                            "genre_id_reference": 132,
                            "album_id_reference": song.album.id
                        }
                            })
                })
            })
        })
    Promise.all(idArtist[2].map((id: any) => axios.get(`https://api.deezer.com/artist/${id}/top?limit=10`)))
    .then(songs => {
        songs.map((song: any)=> { 
            song.data.data.map(async (song: any) => {
                const songId: number = song.id
                song.contributors.map(async (artist: any) => {
                    await db.ArtistId.findOrCreate({
                        where: {"idArtist": artist.id, "id_song_reference": songId},
                        defaults: {
                        "idArtist": artist.id,
                        "nameArtist": artist.name,
                        "id_song_reference": songId
                        }
                    })
                })
                    await db.Song.findOrCreate({
                        where: {"dz_Id": song.id},
                        defaults: {
                            "dz_Id": song.id,
                            "title": song.title,
                            "artist": song.artist.name,
                            "preview": song.preview,
                            "image_small": song.album.cover_small,
                            "image_medium": song.album.cover_medium,
                            "image_big": song.album.cover_big,
                            "reproductions": 0,
                            "duration": song.duration,
                            "genre": 'Pop',
                            "album": song.album.title,
                            "type": song.type,
                            "artist_id_reference": song.artist.id,
                            "genre_id_reference": 132,
                            "album_id_reference": song.album.id
                        }
                            })
                })
            })
        })

    res.send('Songs')
})

app.get('/dbsongs2', async (_req, res)=>{
Promise.all(idArtist[3].map((id: any) => axios.get(`https://api.deezer.com/artist/${id}/top?limit=10`)))
.then(songs => {
    songs.map((song: any)=> { 
        song.data.data.map(async (song: any) => {
            const songId: number = song.id
            song.contributors.map(async (artist: any) => {
                await db.ArtistId.findOrCreate({
                    where: {"idArtist": artist.id, "id_song_reference": songId},
                    defaults: {
                    "idArtist": artist.id,
                    "nameArtist": artist.name,
                    "id_song_reference": songId
                    }
                })
            })
                await db.Song.findOrCreate({
                    where: {"dz_Id": song.id},
                    defaults: {
                        "dz_Id": song.id,
                        "title": song.title,
                        "artist": song.artist.name,
                        "preview": song.preview,
                        "image_small": song.album.cover_small,
                        "image_medium": song.album.cover_medium,
                        "image_big": song.album.cover_big,
                        "reproductions": 0,
                        "duration": song.duration,
                        "genre": 'Pop',
                        "album": song.album.title,
                        "type": song.type,
                        "artist_id_reference": song.artist.id,
                        "genre_id_reference": 132,
                        "album_id_reference": song.album.id
                    }
                    })
        })
    })
})
Promise.all(idArtist[4].map((id: any) => axios.get(`https://api.deezer.com/artist/${id}/top?limit=10`)))
.then(songs => {
    songs.map((song: any)=> { 
        song.data.data.map(async (song: any) => {
            const songId: number = song.id
            song.contributors.map(async (artist: any) => {
                await db.ArtistId.findOrCreate({
                    where: {"idArtist": artist.id, "id_song_reference": songId},
                    defaults: {
                    "idArtist": artist.id,
                    "nameArtist": artist.name,
                    "id_song_reference": songId
                    }
                })
            })
                await db.Song.findOrCreate({
                    where: {"dz_Id": song.id},
                    defaults: {
                        "dz_Id": song.id,
                        "title": song.title,
                        "artist": song.artist.name,
                        "preview": song.preview,
                        "image_small": song.album.cover_small,
                        "image_medium": song.album.cover_medium,
                        "image_big": song.album.cover_big,
                        "reproductions": 0,
                        "duration": song.duration,
                        "genre": 'Pop',
                        "album": song.album.title,
                        "type": song.type,
                        "artist_id_reference": song.artist.id,
                        "genre_id_reference": 132,
                        "album_id_reference": song.album.id
                    }
                    })
        })
    })
})

res.send('Songs')
})

app.get('/chargeSongJson', (_req, res) => {
    Song.findAll().then((result: any) => res.send(result))
})

export default app;