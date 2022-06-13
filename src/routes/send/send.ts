import { Router } from "express";
import db from '../../models/db'
const app = Router()
const { ArtistId, Artist, Song } = db;

app.get('/song', async (_req, res) => {
    return Song.findAll({
        attributes: {
            exclude:
                [
                    'artist_id_reference',
                    'genre_id_reference',
                    'album_id_reference',
                    "AlbumId",
                    "ArtistId",
                    "GenreId"
                ]
        }
    }).then((result: any) => res.send(result))
})

app.get('/artistSong/:id', async (req, res) => {

    const id = req.params.id
    const artist = await Artist.findOne({
        attributes: {
            exclude:
                [
                    'UserId', 'id'
                ]
        },
        where: { dz_Id: id },
        include: {
            model: Song,
            attributes: {
                exclude:
                    [
                        'artist_id_reference',
                        'genre_id_reference',
                        'album_id_reference',
                        "AlbumId",
                        "ArtistId",
                        "GenreId",
                    ]
            }
        }
    })
    const artistSend = {
        ...artist.toJSON(),
        Songs: artist.Songs.map((result: any) => {
            const { title, dz_Id } = result
            return {
                dz_Id, title
            }
        })
    }
    res.send(artistSend)
})

export default app;