import {Router} from "express";
// import axios from 'axios';
// import idArtist from './idArtist.json';
import db from '../../models/db'

export const senddbSongRouter = Router()

senddbSongRouter.get('/song', async (_req, res)=>{
    return db.Song.findAll({
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
