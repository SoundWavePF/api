import {Router} from "express";
// import axios from 'axios';
import artistJson from './artistDbSong.json';
import db from '../../models/db'
const { ArtistId, Artist, Song } = db;

const app = Router()

app.get('/', async (_req, res)=>{
    artistJson.map(async (artist: any) => {
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
    res.send('Artist')
    // return Artist.findAll().then((result: any) => res.send(result))
})

// funcion para guardar info de artistas en archivo.json

// app.get('/chargeJson', async (_req, res)=>{

//     const artistIdDb = await ArtistId.findAll({
//         attributes: ["idArtist"],
//         group: ["idArtist"],
//     });

// const sleep = (ms: any) => {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// const getData = async (artistIdDb: any) => {
//   let info:any[] = [];
//   for (let i = 0; i < artistIdDb.length; i++) {
//     const getInfo = async (artist: any) => {
//       let artistApi = await axios.get(`https://api.deezer.com/artist/${artist.idArtist}`)
//       await sleep(0);
//       return {
//         dz_Id: artistApi.data.id,
//         name: artistApi.data.name,
//         image_small: artistApi.data.picture_small,
//         image_medium: artistApi.data.picture_medium,
//         image_big: artistApi.data.picture_big,
//         type: artistApi.data.type
//       }
//     }
//     let a = await getInfo(artistIdDb[i]);
//     info.push(a);
//   }
//   return info
// }

// const example = async() => {
//     let output = await 
//     getData(artistIdDb);
//     res.send(output)
// }

// example();

// })
        
        // async (artist: any) => {
        //     // console.log(result.data)
        //     const obj = {
        //                 "dz_Id": artist.data.id,
        //                 "name": artist.data.name,
        //                 "image_small": artist.data.picture_small,
        //                 "image_medium": artist.data.picture_medium,
        //                 "image_big": artist.data.picture_big,
        //                 "type": artist.data.type
        //                 }
        //             // console.log(artist)
        //             console.log(obj)
            //         const artistdb = 
            //         await Artist.findOrCreate({
            //             where: {"dz_Id": artist.id},
            //             defaults: {
            //             "dz_Id": artist.id,
            //             "name": artist.name,
            //             "image_small": artist.picture_small,
            //             "image_medium": artist.picture_medium,
            //             "image_big": artist.picture_big,
            //             "type": artist.type
            //             }
            //         })
            // // camila
            // console.log('id', songId)
            // const song = await Song.findOne({where: {dz_Id: songId}})
            // artistdb.setSongs(song)
    // })
    
    // })
    // // )).then((result: any) => console.log(result.data.id))

    // res.send('hola')
    //     })
    // peticiones.map((result: any) => 
    // // console.log(result)
    // res.send(result)
    // )
    //     })
        //     )).then((result: any) => result.data.map(async (artist: any) => {
        //         const obj = {
        //         "dz_Id": artist.id,
        //         "name": artist.name,
        //         "image_small": artist.picture_small,
        //         "image_medium": artist.picture_medium,
        //         "image_big": artist.picture_big,
        //         "type": artist.type
        //         }
        //     // console.log(obj)
        //     const artistdb = 
        //     await Artist.findOrCreate({
        //         where: {"dz_Id": artist.id},
        //         defaults: {
        //         "dz_Id": artist.id,
        //         "name": artist.name,
        //         "image_small": artist.picture_small,
        //         "image_medium": artist.picture_medium,
        //         "image_big": artist.picture_big,
        //         "type": artist.type
        //         }
        //     })
        //     // artist.id_song_reference: string;
        //     // camila
        //     console.log('id', songId)
        //     const song = await Song.findOne({where: {dz_Id: songId}})
        //     artistdb.setSongs(song)
        // }))
        // console.log(artist.idArtist)
        // Promise.all([0].map((id: any) => axios.get(`https://api.deezer.com/artist/${id}/top?limit=10`)))
    // })
    
    // Promise.all(idArtist[0].map((id: any) => axios.get(`https://api.deezer.com/artist/${id}/top?limit=10`)))
    //     .then(songs => {
    //         songs.map((song: any)=> { 
    //             song.data.data.map(async (song: any) => {
    //                 const songId: number = song.id
    //                 song.contributors.map(async (artist: any) => {
    //                     await db.ArtistId.create({
    //                         "idArtist": artist.id,
    //                         "nameArtist": artist.name,
    //                         "id_song_reference": songId
    //                     })
    //                 })
    //                     await db.Song.findOrCreate({
    //                         where: {"dz_Id": song.id},
    //                         defaults: {
    //                             "dz_Id": song.id,
    //                             "title": song.title,
    //                             "artist": song.artist.name,
    //                             "preview": song.preview,
    //                             "image_small": song.album.cover_small,
    //                             "image_medium": song.album.cover_medium,
    //                             "image_big": song.album.cover_big,
    //                             "reproductions": 0,
    //                             "duration": song.duration,
    //                             "genre": 'Pop',
    //                             "album": song.album.title,
    //                             "type": song.type,
    //                             "artist_id_reference": song.artist.id,
    //                             "genre_id_reference": 132,
    //                             "album_id_reference": song.album.id
    //                         }
    //                         })
    //             })
    //         })
    //     })


// res.send('Artist')
// })

export default app;