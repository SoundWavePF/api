import {Router} from "express";
import axios from 'axios';
import artistSeeder from './artistSeed.json'
import genresSeeder from './genresSeed.json'
// import {AlbumSearch} from "../interfaces";
import db from '../models/db'

export const seederRouter = Router()

let genresIds = [152, 132, 116, 113, 122, 165, 197]
const genresSeederObj: {[key: string]: any} = {
    113: "Dance",
    152: "Rock",
    116: "Rap/Hip Hop",
    122: "Reggaeton",
    165: "R&B",
    197: "Latin Music"
}
seederRouter.get('/artists', async (_req, res)=>{
    axios.all(Object.keys(artistSeeder).map((id) => axios.get(`https://api.deezer.com/artist/${id}`)))
        .then(axios.spread((...artists) => {
            artists.map(async (artist)=> {
                await db.Artist.create({
                // let createdArtist = await db.Artist.create({
                    "dzId": artist.data.id,
                    "name": artist.data.name,
                    "url_avatar": artist.data.picture_medium
                })
                // console.log(artist.data.name)
                // let {data: AlbumFetch} = await axios.get(`https://api.deezer.com/artist/${artist.data.id}/albums`)
                // console.log(AlbumFetch)
            })
        })
    );

    const artistDb = await db.Artist.findAll()

    res.send('ARTISTS')

})

interface Genres {
    data: Datum[];
}

interface Datum {
    id:      number;
    name:    string;
}

seederRouter.get('/albums', async(_req, res)=>{
    let genres:any[] = []
    axios.all(Object.keys(artistSeeder).map((id) => axios.get(`https://api.deezer.com/artist/${id}/albums`)))
        .then(axios.spread((...albums) => {
                albums.map(async (album)=> {
                    let artistDzId = album.config.url!.match(/\d/g)!.join("");
                    let albums = album.data.data.slice(0,2).map(async(album:{id:number, title:string, release_date:string, cover:string, genre_id:string, genres:object}) => {
                        let createdAlbum = await db.Album.create({
                            "dzId": album.id,
                            "name": album.title,
                            "genre": genresSeederObj[album.genre_id],
                            "release_date": album.release_date,
                            "cover": album.cover
                        })
                        const artist = await db.Artist.findOne({where:{dzId: artistDzId}})
                        artist.setAlbums(createdAlbum)

                        setTimeout(async ()=>{
                            const {data:songFetch} = await axios.get(`https://api.deezer.com/album/${album.id}/tracks`)
                            songFetch.data.map(async(song:any)=>{
                                // console.log(song)
                                const songCreated = await db.Song.create({
                                    "dzId": song.id,
                                    "title": song.title,
                                    "preview": song.preview,
                                    "image": album.cover,
                                    "duration": song.duration
                                })
                                artist.setSongs(songCreated)
                                createdAlbum.setSongs(songCreated)
                            })
                            // console.log(songFetch.data)
                        }, 5000)
                    })
                })
            })
        );
    // const artistDb = await db.Artist.findAll()
    // res.send(artistDb)
    console.log(genres)
    res.send('ALBUMS')
})

seederRouter.get('/songs', async(_req, res)=>{
    // const mapped = Object.entries(genresSeederObj).map(async([k,v]) => {
    //     const createdGenre = await db.Genre.create({
    //         "dzId": k,
    //         "name": v
    //     })
    // });
    // const albumsDB = await db.Album.findAll()
    // albumsDB.map((albumDb: any) => {
    //     console.log(albumDb.dzId)
    // })
    // console.log(albumsDB)
    // res.send(genresSeeder[197])
    const albumsDB = await db.Album.findAll()
    axios.all(albumsDB.map((albumDb: any)=>axios.get(`https://api.deezer.com/album/${albumDb.dzId}/tracks`)))
        .then(axios.spread((...songs)=>{
            songs.map(async(song: any)=>{
                let genresArr:any = []
                let albumDzId = song.config.url!.match(/\d/g)!.join("");

                console.log(song.data.data)


            })
        }))
    res.send('SONGS')
})