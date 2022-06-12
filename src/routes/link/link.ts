import {Router} from "express";
import db from '../../models/db'
const { ArtistSong, Artist, Song } = db;

const app = Router()

app.get('/songArtist', async (_req, res)=>{

    const artistId = await ArtistSong.findAll()
    artistId.map(async (artist: any) => {
        const artistDb = await Artist.findOne({where : {dz_Id: artist.idArtist}})
        const songDb = await Song.findOne({where : {dz_Id: artist.id_song_reference}})
        await songDb.addArtist(artistDb)
    })

res.send('relations')
})

export default app;
