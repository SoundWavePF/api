import {Router} from "express";
import axios from 'axios';
import db from '../../models/db'
import albumApi from './albumApi.json'
const app = Router()
const { Song, Album, AlbumGenre, ArtistAlbum } = db;

app.get('/', async (_req, res) => {
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

res.send('Album')
})


app.get('/chargeAlbumApi', async (_req, res)=>{
    
    const idAlbum = await Song.findAll({
        attributes: ["album_id_reference"],
        group: ["album_id_reference"]
    })

    let arrAlbum = [];
    for (let i: number = 0; i < idAlbum.length; i++) {
        const id = idAlbum[i].album_id_reference
        const album = await axios.get(`https://api.deezer.com/album/${id}`)
        const obj = {
            dz_Id: album.data.id,
            name: album.data.title,
            release_date: album.data.release_date,
            image_small: album.data.cover_small,
            image_medium: album.data.cover_medium,
            image_big: album.data.cover_big,
            type: album.data.type,
            genres: album.data.genres.data,
            contributors: album.data.contributors
        }
        arrAlbum.push(obj);
    }

    res.send(arrAlbum)
})

export default app;