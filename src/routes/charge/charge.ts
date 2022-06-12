import {Router} from "express";
import db from '../../models/db'
import artist from './artistDb.json';
import songDb from './songDb.json';
import albumApi from './albumApi.json';
import genres from './genres.json';
import artistSong from './ArtistSongDb.json';
const { Song, Artist, Album, Genre, AlbumGenre, ArtistAlbum, ArtistSong } = db;
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
    songDb.map(async (song: any) => {
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

    //charge album
    albumApi.map(async (album: any) => {
        const albumId = album.dz_Id
        const nameAlbum = album.name
        album.genres.map(async (genre: any) => {
            await AlbumGenre.findOrCreate({
                where: {idAlbum: albumId, idGenre: genre.id},
                defaults: {
                    idAlbum: albumId,
                    nameAlbum: nameAlbum,
                    idGenre: genre.id
                }
            })
        })
        album.contributors.map(async (artist: any) => {
            await ArtistAlbum.findOrCreate({
                where: {idAlbum: albumId, idArtist: artist.id},
                defaults: {
                    idArtist: artist.id,
                    nameArtist: artist.name,
                    idAlbum: albumId
                }
            })
        })
        await Album.findOrCreate({
            where: {dz_Id: album.dz_Id},
            defaults: {
                dz_Id: album.dz_Id,
                name: album.name,
                release_date: album.release_date,
                image_small: album.image_small,
                image_medium: album.image_medium,
                image_big: album.image_big,
                type: album.type,
            }
            })
        })
    
        //charge Genre
    genres.map(async (genre: any) => {
        await Genre.findOrCreate({
            where: {"dz_Id": genre.dz_Id},
            defaults: {
                "dz_Id": genre.dz_Id,
                "name": genre.name,
                "type": genre.type,
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

    //relations

    // artis Song
    const artistIdDb = await ArtistSong.findAll()
    artistIdDb.map(async (artist: any) => {
        const artistDb = await Artist.findOne({where : {dz_Id: artist.idArtist}})
        const songDb = await Song.findOne({where : {dz_Id: artist.id_song_reference}})
        await songDb.addArtist(artistDb)
    })

    // albumGenre
    const albumGenre = await AlbumGenre.findAll()
    albumGenre.map(async (genre: any) => {
        const albumDb = await Album.findOne({where : {dz_Id: genre.idAlbum}})
        const genreDb = await Genre.findOne({where : {dz_Id: genre.idGenre}})
        if (genreDb) await genreDb.addAlbum(albumDb)
    })


    // artist Album
    const artistAlbum = await ArtistAlbum.findAll()
    artistAlbum.map(async (artist: any) => {
        const artistDb = await Artist.findOne({where : {dz_Id: artist.idArtist}})
        const albumDb = await Album.findOne({where : {dz_Id: artist.idAlbum}})
        if ( artistDb && albumDb ) await artistDb.addAlbum(albumDb)
    })

    // song Album
    const songAlb = await Song.findAll()
    songAlb.map(async (song: any) => {
        const songDb = await Song.findOne({where : {dz_Id: song.dz_Id}})
        const albumDb = await Album.findOne({where : {dz_Id: song.album_id_reference}})
        if ( albumDb ) await albumDb.addSong(songDb)
    })

    // song Genre
    const song = await Song.findAll()
    song.map(async (song: any) => {
        const songDb = await Song.findOne({where : {dz_Id: song.dz_Id}})
        const genreDb = await Genre.findOne({where : {name: song.genre}})
        if ( genreDb ) await genreDb.addSong(songDb)
    })


    res.send('Artist')

    // res.send(artistId)
    // ArtistSong.findAll().then((result: any) => res.send(result))
})

export default app;