import { Router } from "express";
import db from '../../models/db'
const app = Router()
const { artistId, artist, song } = db;

app.get('/song', async (_req, res) => {
    return song.findAll({
        attributes: {
            exclude:
                [
                    'artist_id_reference',
                    'genre_id_reference',
                    'album_id_reference',
                    "albumId",
                    "artistId",
                    "genreId"
                ]
        }
    }).then((result: any) => res.send(result))
})

app.get('/artistSong/:id', async (req, res) => {

    const id = req.params.id
    const artistDb = await artist.findOne({
        attributes: {
            exclude:
                [
                    'userId', 'id'
                ]
        },
        where: { dz_Id: id },
        include: {
            model: song,
            attributes: {
                exclude:
                    [
                        'artist_id_reference',
                        'genre_id_reference',
                        'album_id_reference',
                        "albumId",
                        "artistId",
                        "genreId",
                    ]
            }
        }
    })
    const artistSend = {
        ...artistDb.toJSON(),
        songs: artist.songs.map((result: any) => {
            const { title, dz_Id } = result
            return {
                dz_Id, title
            }
        })
    }
    res.send(artistSend)
})

export default app;