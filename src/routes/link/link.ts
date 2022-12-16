import { Router } from "express";
import db from '../../models/db'
const { ArtistSong, Artist, Song, AlbumGenre, Album, Genre, ArtistAlbum } = db;

const app = Router()

app.get('/songArtist', async (_req, res) => {

    const artistId = await ArtistSong.findAll()
    artistId.map(async (artist: any) => {
        const artistDb = await Artist.findOne({ where: { dz_Id: artist.idArtist } })
        const songDb = await Song.findOne({ where: { dz_Id: artist.id_song_reference } })
        await songDb.addArtist(artistDb)
    })

    res.send('relations')
})
app.get('/albumGenre', async (_req, res) => {

    const albumGenre = await AlbumGenre.findAll()
    albumGenre.map(async (genre: any) => {
        const albumDb = await Album.findOne({ where: { dz_Id: genre.idAlbum } })
        const genreDb = await Genre.findOne({ where: { dz_Id: genre.idGenre } })
        if (genreDb) await genreDb.addAlbum(albumDb)
    })

    res.send('relations')
})
app.get('/artistAlbum', async (_req, res) => {

    const artistAlbum = await ArtistAlbum.findAll()
    artistAlbum.map(async (artist: any) => {
        const artistDb = await Artist.findOne({ where: { dz_Id: artist.idArtist } })
        const albumDb = await Album.findOne({ where: { dz_Id: artist.idAlbum } })
        if (artistDb && albumDb) await artistDb.addAlbum(albumDb)
    })

    res.send('relations')
})
app.get('/songAlbum', async (_req, res) => {

    const song = await Song.findAll()
    song.map(async (song: any) => {
        const songDb = await Song.findOne({ where: { dz_Id: song.dz_Id } })
        const albumDb = await Album.findOne({ where: { dz_Id: song.album_id_reference } })
        if (albumDb) await albumDb.addSong(songDb)
    })

    res.send('relations')
})
app.get('/songGenre', async (_req, res) => {

    const song = await Song.findAll()
    song.map(async (song: any) => {
        const songDb = await Song.findOne({ where: { dz_Id: song.dz_Id } })
        const genreDb = await Genre.findOne({ where: { name: song.genre } })
        if (genreDb) await genreDb.addSong(songDb)
    })

    res.send('relations')
})



export default app;
