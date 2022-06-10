import {Router} from "express";
import axios from 'axios';
import idArtist from './idArtist.json';
import db from '../models/db'

export const chargedbSongRouter = Router()

chargedbSongRouter.get('/dbsongs1', async (_req, res)=>{
    
    Promise.all(idArtist[0].map((id: any) => axios.get(`https://api.deezer.com/artist/${id}/top?limit=10`)))
        .then(songs => {
            songs.map((song: any)=> { 
                song.data.data.map(async (song: any) => {
                        await db.Song.findOrCreate({
                            where: {"id": song.id},
                            defaults: {
                                "id": song.id,
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
                        await db.Song.findOrCreate({
                            where: {"id": song.id},
                            defaults: {
                                "id": song.id,
                                "title": song.title,
                                "artist": song.artist.name,
                                "preview": song.preview,
                                "image_small": song.album.cover_small,
                                "image_medium": song.album.cover_medium,
                                "image_big": song.album.cover_big,
                                "reproductions": 0,
                                "duration": song.duration,
                                "genre": 'Reggaeton',
                                "album": song.album.title,
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
                        await db.Song.findOrCreate({
                            where: {"id": song.id},
                            defaults: {
                                "id": song.id,
                                "title": song.title,
                                "artist": song.artist.name,
                                "preview": song.preview,
                                "image_small": song.album.cover_small,
                                "image_medium": song.album.cover_medium,
                                "image_big": song.album.cover_big,
                                "reproductions": 0,
                                "duration": song.duration,
                                "genre": 'Salsa',
                                "album": song.album.title,
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

chargedbSongRouter.get('/dbsongs2', async (_req, res)=>{
Promise.all(idArtist[3].map((id: any) => axios.get(`https://api.deezer.com/artist/${id}/top?limit=10`)))
.then(songs => {
    songs.map((song: any)=> { 
        song.data.data.map(async (song: any) => {
                await db.Song.findOrCreate({
                    where: {"id": song.id},
                    defaults: {
                        "id": song.id,
                        "title": song.title,
                        "artist": song.artist.name,
                        "preview": song.preview,
                        "image_small": song.album.cover_small,
                        "image_medium": song.album.cover_medium,
                        "image_big": song.album.cover_big,
                        "reproductions": 0,
                        "duration": song.duration,
                        "genre": 'Rock',
                        "album": song.album.title,
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
                await db.Song.findOrCreate({
                    where: {"id": song.id},
                    defaults: {
                        "id": song.id,
                        "title": song.title,
                        "artist": song.artist.name,
                        "preview": song.preview,
                        "image_small": song.album.cover_small,
                        "image_medium": song.album.cover_medium,
                        "image_big": song.album.cover_big,
                        "reproductions": 0,
                        "duration": song.duration,
                        "genre": 'Rap/Hip Hop',
                        "album": song.album.title,
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