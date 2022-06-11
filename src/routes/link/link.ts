import {Router} from "express";
import db from '../../models/db'
const { ArtistId, Artist, Song } = db;

const app = Router()

app.get('/songArtist', async (_req, res)=>{

    const Artistid = await ArtistId.findAll()
    Artistid.map(async (artist: any) => {  // 1300 length
        // id artist
        // id cancion referencia
        const artistDb = await Artist.findOne({where : {dz_Id: artist.idArtist}})
        const songDb = await Song.findOne({where : {dz_Id: artist.id_song_reference}})
        await songDb.addArtist(artistDb)
        // await songDb.setArtists(artistDb)
    // await countryDb.addActivity(activityDb);

    })

res.send('relations')
})

export default app;
