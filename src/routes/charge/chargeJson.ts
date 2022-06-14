import { Router } from "express";
import axios from 'axios';
import artistsApi from './idArtistsRequest.json';
import albumRequestApi from './idAlbumsRequest.json';
import idSongIdAlbum1 from './idSongIdAlbum1.json';
import idSongIdAlbum2 from './idSongIdAlbum2.json';
import idSongIdAlbum from "./idSongIdAlbum.json";
import albumApi from "./albumApi.json";
import songApi from "./songApi.json";
const songApiAux: any = songApi

import db from '../../models/db'
const { ArtistId, Artist, Song, ArtistSong, SongGenre } = db;
const app = Router()

app.get('/twoAlbum', async (_req, res) => {

    let arrAlbum = [];
    for (let i = 0; i < artistsApi.length; i++) {
        const id = artistsApi[i]
        const album = await axios.get(`https://api.deezer.com/artist/${id}/albums`)
        if (album.data.data[0]) {
            console.log(album.data.data[1])
            arrAlbum.push(album.data.data[0].id)
            if (album.data.data[3]) arrAlbum.push(album.data.data[3].id)
        }
    }

    res.send(arrAlbum)
})
app.get('/albumSearch', async (_req, res) => {

    let arrAlbum: { idAlbum: number; idSong: number; }[] = [];
    for (let i = 0; i < albumRequestApi.length; i++) {
        const id = albumRequestApi[i]
        const album = await axios.get(`https://api.deezer.com/album/${id}`)
        const idAlbum = album.data.id
        album.data.tracks.data?.map((song: any) => {
            const obj = {
                idSong: song.id,
                idAlbum
            }
            arrAlbum.push(obj)
        })
    }

    res.send(arrAlbum)
})
app.get('/songRequest', async (_req, res) => {

    let arrAlbum: { idAlbum: number; idSong: number; }[] = [];
    for (let i = 0; i < artistsApi.length; i++) {
        const id = artistsApi[i]
        const artist = await axios.get(`https://api.deezer.com/artist/${id}/top?limit=10`)
        artist.data.data.map((song: any) => {
            const obj = {
                idSong: song.id,
                idAlbum: song.album.id
            }
            arrAlbum.push(obj)
        })
    }

    res.send(arrAlbum)
})
app.get('/concatJson', async (_req, res) => {

    const concat = idSongIdAlbum1.concat(idSongIdAlbum2)

    res.send(concat)
})
app.get('/albumJson', async (_req, res) => {

    const idAlbumRequest = [...new Set(idSongIdAlbum.map((element: any) => element.idAlbum))]
    let arrAlbum = [];
    // for (let i = 0; i < idAlbumRequest.length; i++) {
    for (let i = 0; i < 3; i++) {
        const id = idAlbumRequest[i]
        const album = await axios.get(`https://api.deezer.com/album/${id}`)
        const obj = {
            id: album.data.id,
            name: album.data.title,
            release_date: album.data.release_date,
            image_small: album.data.cover_small,
            image_medium: album.data.cover_medium,
            image_big: album.data.cover_big,
            type: album.data.type,
            artists: album.data.contributors,
            genres: album.data.genres.data
        }
        arrAlbum.push(obj)
    }

    // res.send(idAlbumRequest)
    res.send(arrAlbum)
    // res.send('art')
})
app.get('/songApi', async (_req, res) => {

    const idSongRequest = [...new Set(idSongIdAlbum.map((element: any) => element.idSong))]
    let arrSong = [];
    // for (let i = 0; i < idSongRequest.length; i++) {
    for (let i = 0; i < 3; i++) {
        const id = idSongRequest[i]
        const song = await axios.get(`https://api.deezer.com/track/${id}`)
        const obj = {
            id: song.data.id,
            name: song.data.title,
            preview: song.data.preview,
            image_small: song.data.album.cover_small,
            image_medium: song.data.album.cover_medium,
            image_big: song.data.album.cover_big,
            reproductions: 0,
            duration: song.data.duration,
            type: song.data.type,
            artist: song.data.contributors
        }
        arrSong.push(obj)
    }

    // res.send(idAlbumRequest)
    res.send(arrSong)
    // res.send('art')
})
app.get('/genreApi', async (_req, res) => {
    let idGenreRequest: any[] = []
    albumApi.map((element: any) => element.genres.map((element: any) => idGenreRequest.push(element.id)))
    const genreRequest = [...new Set(idGenreRequest)]
    let arrGenre = [];
    for (let i = 0; i < genreRequest.length; i++) {
        // for (let i = 0; i < 3; i++) {
        const id = genreRequest[i]
        const genre = await axios.get(`https://api.deezer.com/genre/${id}`)
        const obj = {
            id: genre.data.id,
            name: genre.data.name,
            image_small: genre.data.picture_small,
            image_medium: genre.data.picture_medium,
            image_big: genre.data.picture_big,
            type: genre.data.type,
        }
        arrGenre.push(obj)
    }

    // res.send(idAlbumRequest)
    res.send(arrGenre)
    // res.send('art')
})
app.get('/artistApi', async (_req, res) => {
    let idArtistRequest: any[] = []
    albumApi.map((element: any) => element.artists.map((element: any) => idArtistRequest.push(element.id)))
    songApiAux.map((element: any) => element.artist.map((element: any) => idArtistRequest.push(element.id)))
    const artistRequest = [...new Set(idArtistRequest)]
    console.log(artistRequest.length)
    let arrArtist = [];
    // for (let i = 0; i < artistRequest.length; i++) {
    for (let i = 0; i < 3; i++) {
        const id = artistRequest[i]
        const artist = await axios.get(`https://api.deezer.com/artist/${id}`)
        const obj = {
            id: artist.data.id,
            name: artist.data.name,
            image_small: artist.data.picture_small,
            image_medium: artist.data.picture_medium,
            image_big: artist.data.picture_big,
            type: artist.data.type,
        }
        arrArtist.push(obj)
    }

    // res.send(idAlbumRequest)
    res.send(arrArtist)
    // res.send('art')
})
app.get('/artistSong', async (_req, res) => {

    const artistSong = await ArtistSong.findAll()
    // res.send(idAlbumRequest)
    res.send(artistSong)
    // res.send('art')
})
app.get('/songGenre', async (_req, res) => {

    const songGenre = await SongGenre.findAll()
    // res.send(idAlbumRequest)
    res.send(songGenre)
    // res.send('art')
})


export default app;