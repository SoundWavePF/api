import { Router } from "express";
import db from '../../models/db'
import albumApi from './albumApi.json'
import songApi from './songApi.json'
import artistApi from './artistApi.json'
import genreApi from './genreApi.json'
import song_Album from './idSongIdAlbum.json'
import artist_Song from './idArtistIdSong.json'
import songGenreApi from './idSongIdGenre.json'

const songApiAux: any = songApi
const app = Router()
const { song, album, artist, genre, artistSong, albumGenre, artistAlbum, songGenre } = db;

function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
}

app.get('/one', async (_req, res) => {
    albumApi.map(async (element: any) => {
        await album.findOrCreate({
            where: { dz_Id: element.id },
            defaults: {
                dz_Id: element.id,
                name: element.name,
                release_date: element.release_date,
                image_small: element.image_small,
                image_medium: element.image_medium,
                image_big: element.image_big,
                type: element.type,
            }
        })
    })
    songApiAux.map(async (element: any) => {
        await song.findOrCreate({
            where: { dz_Id: element.id },
            defaults: {
                dz_Id: element.id,
                name: element.name,
                preview: element.preview,
                image_small: element.image_small,
                image_medium: element.image_medium,
                image_big: element.image_big,
                reproductions: getRandomInt(1000),
                duration: element.duration,
                type: element.type,
            }
        })
    })

    songGenreApi.map(async (song: any) => {
        await songGenre.findOrCreate({
            where: { idSong: song.idSong, idGenre: song.idGenre },
            defaults: {
                idSong: song.idSong,
                idGenre: song.idGenre
            }
        })
    })
    genreApi.map(async (element: any) => {
        await genre.findOrCreate({
            where: { dz_Id: element.id },
            defaults: {
                dz_Id: element.id,
                name: element.name,
                image_small: element.image_small,
                image_medium: element.image_medium,
                image_big: element.image_big,
                type: element.type,
            }
        })
    })

    // relations


    // song genre
    const song_Genre = await songGenre.findAll()
    song_Genre.map(async (element: any) => {
        const songDb = await song.findOne({ where: { dz_Id: element.idSong } })
        const genreDb = await genre.findOne({ where: { dz_Id: element.idGenre } })
        genreDb.addSong(songDb)
    })


    // song album
    song_Album.map(async (element: any) => {
        const songDb = await song.findOne({ where: { dz_Id: element.idSong } })
        const albumDb = await album.findOne({ where: { dz_Id: element.idAlbum } })
        albumDb.addSong(songDb)
    })

    res.send('Charger Successfully One')
})

app.get('/two', async (_req, res) => {
    artistApi.map(async (element: any) => {
        await artist.findOrCreate({
            where: { dz_Id: element.id },
            defaults: {
                dz_Id: element.id,
                name: element.name,
                image_small: element.image_small,
                image_medium: element.image_medium,
                image_big: element.image_big,
                type: element.type,
            }
        })
    })

    artist_Song.map(async (element: any) => {
        await artistSong.findOrCreate({
            where: { idSong: element.idSong, idArtist: element.idArtist },
            defaults: {
                idSong: element.idSong,
                idArtist: element.idArtist
            }
        })
    })

    albumApi.map(async (element: any) => {
        const albumId = element.id
        element.genres.map(async (element: any) => {
            await albumGenre.findOrCreate({
                where: { idAlbum: albumId, idGenre: element.id },
                defaults: {
                    idAlbum: albumId,
                    idGenre: element.id
                }
            })
        })
    })
    albumApi.map(async (element: any) => {
        const genreId = element.id
        element.artists.map(async (e: any) => {
            await artistAlbum.findOrCreate({
                where: { idArtist: e.id, idAlbum: genreId },
                defaults: {
                    idArtist: e.id,
                    idAlbum: genreId
                }
            })
        })
    })

    // // relations

    // song album
    song_Album.map(async (element: any) => {
        const songDb = await song.findOne({ where: { dz_Id: element.idSong } })
        const albumDb = await album.findOne({ where: { dz_Id: element.idAlbum } })
        albumDb.addSong(songDb)
    })

    // song artist
    const artistSongDb = await artistSong.findAll()
    artistSongDb.map(async (element: any) => {
        const songDb = await song.findOne({ where: { dz_Id: element.idSong } })
        const artistDb = await artist.findOne({ where: { dz_Id: element.idArtist } })
        songDb.addArtist(artistDb)
    })


    // albumGenre
    const albumGenreDb = await albumGenre.findAll()
    albumGenreDb.map(async (element: any) => {
        const albumDb = await album.findOne({ where: { dz_Id: element.idAlbum } })
        const genreDb = await genre.findOne({ where: { dz_Id: element.idGenre } })
        albumDb.addGenre(genreDb)
    })


    // artist album
    const artistAlbumDb = await artistAlbum.findAll()
    artistAlbumDb.map(async (element: any) => {
        const artistDb = await artist.findOne({ where: { dz_Id: element.idArtist } })
        const albumDb = await album.findOne({ where: { dz_Id: element.idAlbum } })
        artistDb.addAlbum(albumDb)
    })


    res.send('Charger Successfully two')
})

export default app;