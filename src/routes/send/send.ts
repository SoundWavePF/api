import {Router} from "express";
import db from '../../models/db'
const app = Router()
const { ArtistId, Artist, Song } = db;

app.get('/song', async (_req, res)=>{
    return Song.findAll({
        attributes: {exclude: 
            [
                'artist_id_reference', 
                'genre_id_reference', 
                'album_id_reference', 
                "AlbumId",
                "ArtistId",
                "GenreId"
        ]}
    }).then((result: any) => res.send(result))
})

app.get('/artistSong/:id', async (req, res)=>{
    // console.log(req.params.id)

    const id = req.params.id
    return Artist.findAll({
        where: {dz_Id: id},
        include: {
            model: Song,
            attributes: { exclude: 
                [
                    'artist_id_reference', 
                    'genre_id_reference', 
                    'album_id_reference', 
                    "AlbumId",
                    "ArtistId",
                    "GenreId",
            ]}
        }
    }).then((result: any) => {
        return res.send(result[0])
    })
})

export default app;