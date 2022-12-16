import { Router } from "express";
import db from '../../models/db'
import albumApi from './albumApi.json'
import songApi from './songApi.json'
import artistApi from './artistApi.json'
import genreApi from './genreApi.json'
import songAlbum from './idSongIdAlbum.json'
import artistSong from './idArtistIdSong.json'
import songGenre from './idSongIdGenre.json'
const songApiAux: any = songApi
const app = Router()
const { Song, Album, Artist, Genre, ArtistSong, AlbumGenre, ArtistAlbum, SongGenre } = db;

app.get('/create', async (_req, res) => {
    await albumApi.map(async (album: any) => {
        await Album.findOrCreate({
            where: { dz_Id: album.id },
            defaults: {
                dz_Id: album.id,
                name: album.name,
                release_date: album.release_date,
                image_small: album.image_small,
                image_medium: album.image_medium,
                image_big: album.image_big,
                type: album.type,
            }
        })
    })
    await songApiAux.map(async (song: any) => {
        await Song.findOrCreate({
            where: { dz_Id: song.id },
            defaults: {
                id_Id: song.id,
                name: song.name,
                preview: song.preview,
                image_small: song.image_small,
                image_medium: song.image_medium,
                image_big: song.image_big,
                reproductions: 0,
                duration: song.duration,
                type: song.type,
            }
        })
    })
    await artistApi.map(async (artist: any) => {
        await Artist.findOrCreate({
            where: { dz_Id: artist.id },
            defaults: {
                dz_Id: artist.id,
                name: artist.name,
                image_small: artist.image_small,
                image_medium: artist.image_medium,
                image_big: artist.image_big,
                type: artist.type,
            }
        })
    })
    await genreApi.map(async (genre: any) => {
        await Genre.findOrCreate({
            where: { dz_Id: genre.id },
            defaults: {
                dz_Id: genre.id,
                name: genre.name,
                image_small: genre.image_small,
                image_medium: genre.image_medium,
                image_big: genre.image_big,
                type: genre.type,
            }
        })
    })
    await artistSong.map(async (song: any) => {
        await ArtistSong.findOrCreate({
            where: { idSong: song.idSong, idArtist: song.idArtist },
            defaults: {
                idSong: song.idSong,
                idArtist: song.idArtist
            }
        })
    })

    await albumApi.map(async (album: any) => {
        const albumId = album.id
        album.genres.map(async (genre: any) => {
            await AlbumGenre.findOrCreate({
                where: { idAlbum: albumId, idGenre: genre.id },
                defaults: {
                    idAlbum: albumId,
                    idGenre: genre.id
                }
            })
        })
    })
    await albumApi.map(async (album: any) => {
        const albumId = album.id
        album.artists.map(async (artist: any) => {
            await ArtistAlbum.findOrCreate({
                where: { idArtist: artist.id, idAlbum: albumId },
                defaults: {
                    idArtist: artist.id,
                    idAlbum: albumId
                }
            })
        })
    })

    await songGenre.map(async (song: any) => {
        await SongGenre.findOrCreate({
            where: { idSong: song.idSong, idGenre: song.idGenre },
            defaults: {
                idSong: song.idSong,
                idGenre: song.idGenre
            }
        })
    })

    res.send('chargeTables')
})

app.get('/link', async (_req, res) => {

    //relations

    // song Album
    songAlbum.map(async (element: any) => {
        const songDb = await Song.findOne({ where: { dz_Id: element.idSong } })
        const albumDb = await Album.findOne({ where: { dz_Id: element.idAlbum } })
        albumDb.addSong(songDb)
    })

    // song Artist
    const artistSongDb = await ArtistSong.findAll()
    artistSongDb.map(async (artist: any) => {
        const songDb = await Song.findOne({ where: { dz_Id: artist.idSong } })
        const artistDb = await Artist.findOne({ where: { dz_Id: artist.idArtist } })
        songDb.addArtist(artistDb)
    })


    // albumGenre
    const albumGenre = await AlbumGenre.findAll()
    albumGenre.map(async (genre: any) => {
        const albumDb = await Album.findOne({ where: { dz_Id: genre.idAlbum } })
        const genreDb = await Genre.findOne({ where: { dz_Id: genre.idGenre } })
        albumDb.addGenre(genreDb)
    })


    // artist Album
    const artistAlbum = await ArtistAlbum.findAll()
    artistAlbum.map(async (artist: any) => {
        const artistDb = await Artist.findOne({ where: { dz_Id: artist.idArtist } })
        const albumDb = await Album.findOne({ where: { dz_Id: artist.idAlbum } })
        artistDb.addAlbum(albumDb)
    })

    // song Genre
    const songGenre = await SongGenre.findAll()
    songGenre.map(async (song: any) => {
        const songDb = await Song.findOne({ where: { dz_Id: song.idSong } })
        const genreDb = await Genre.findOne({ where: { dz_Id: song.idGenre } })
        genreDb.addSong(songDb)
    })


    res.send('link')
})

export default app;