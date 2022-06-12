import {Router} from "express";
// import axios from 'axios';
// import artistJson from './artistDbSong.json';
import db from '../../models/db'
const { ArtistId, Artist, Song } = db;
const app = Router()

app.get('/song', (_req, res) => {
    Song.findAll().then((result: any) => res.send(result))
})
app.get('/artist', (_req, res) => {
    Artist.findAll().then((result: any) => res.send(result))
})
app.get('/artistId', (_req, res) => {
    ArtistId.findAll().then((result: any) => res.send(result))
})

export default app;