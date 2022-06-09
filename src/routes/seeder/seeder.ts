import {Router} from "express";
import axios from '../../../node_modules/axios';
import artistSeeder from './artistSeed.json'
import genresSeeder from './genresSeed.json'
import artistBase from './arrtists.json'
import albumBase from './albumdata.json'
import songBase from './songsdata.json'
// import {AlbumSearch} from "../interfaces";
import db from '../../models/db'

export const seederRouter = Router()

const genresSeederObj: {[key: string]: any} = {
    113: "Dance",
    152: "Rock",
    116: "Rap/Hip Hop",
    122: "Reggaeton",
    165: "R&B",
    197: "Latin Music",
    132: "Pop",
    106: "Electro"
}
seederRouter.get('/artists', async (_req, res)=>{
    artistBase.map(async(artist)=>{
                    await db.Artist.create({
                    // let createdArtist = await db.Artist.create({
                        "dzId": artist.dzId,
                        "name": artist.name,
                        "url_small": artist.url_small,
                        "url_medium": artist.url_medium,
                        "url_big": artist.url_big,
                        "url_xl": artist.url_xl
                    })
    })
    res.send(artistBase)
    // axios.all(Object.keys(artistSeeder).map((id) => axios.get(`https://api.deezer.com/artist/${id}`)))
    //     .then(axios.spread((...artists) => {
    //         artists.map(async (artist)=> {
    //             await db.Artist.create({
    //             // let createdArtist = await db.Artist.create({
    //                 "dzId": artist.data.id,
    //                 "name": artist.data.name,
    //                 "url_small": artist.data.picture_small,
    //                 "url_medium": artist.data.picture_medium,
    //                 "url_big": artist.data.picture_big,
    //                 "url_xl": artist.data.picture_xl
    //             })
    //             // console.log(artist.data.name)
    //             // let {data: AlbumFetch} = await axios.get(`https://api.deezer.com/artist/${artist.data.id}/albums`)
    //             // console.log(AlbumFetch)
    //         })
    //     })
    // );
    //
    // const artistDb = await db.Artist.findAll()
    //
    // res.send(artistDb)

})

seederRouter.get('/albums', async(_req, res)=>{
    albumBase.map(albumInfo =>{
        albumInfo.data.map(async(albums)=>{
            let createdAlbum = await db.Album.create({
                "dzId": albums.id,
                "name": albums.title,
                "release_date": albums.release_date,
                "cover_small": albums.cover_small,
                "cover_medium": albums.cover_xl,
                "cover_big": albums.cover_xl,
                "cover_xl": albums.cover_xl
            })
            const artist = await db.Artist.findOne({where: {dzId: albumInfo.artistId}})
            artist.setAlbums(createdAlbum)
            // console.log(artist)

            let filterSongs = songBase.filter(songInfo=> songInfo.albumId === String(albums.id) )
            filterSongs.map(songInfo=>songInfo.data.map(async(song)=>{
                let stringId = String(song.id)
                let genreString = String(albums.genre_id)
                try{
                const songDb = await db.Song.findOne({where:{dzId: stringId}})
                    artist.setSongs(songDb)
                    createdAlbum.setSongs(songDb)
                    songDb.cover_small = albums.cover_small
                    songDb.cover_medium = albums.cover_medium
                    songDb.cover_big = albums.cover_big
                    songDb.cover_xl = albums.cover_xl
                    await songDb.save()
                    const genreDb = await db.Genre.findOne({where:{dzId: genreString}})
                    genreDb.setAlbums(createdAlbum)
                    genreDb.setSongs(songDb)
                } catch (e) {
                    console.log(e)
                }

                // try{
                //     const genreDb = await db.Genre.findOne({where:{dzId: genreString}})
                //     genreDb.setAlbums(createdAlbum)
                //     genreDb.setSongs(songDb)
                // } catch (e) {
                //     console.log(e)
                // }
            }))
        })
    })
    res.send(albumBase)
    // axios.all(Object.keys(artistSeeder).map((id) => axios.get(`https://api.deezer.com/artist/${id}/albums`)))
    //     .then(axios.spread((...albums) => {
    //             let genres:any[] = []
    //             albums.map(async (album)=> {
    //                 let artistDzId = album.config.url!.match(/\d/g)!.join("");
    //                 let albums = album.data.data.slice(0,2)
    //                 let obj = {artistId: artistDzId, data: albums}
    //                 genres.push(obj)
                        // let albums = album.data.data.slice(0,2).map(async(album:{id:number, title:string, release_date:string, cover:string, genre_id:string, genres:object}) => {

                        // let createdAlbum = await db.Album.create({
                        //     "dzId": album.id,
                        //     "name": album.title,
                        //     "genre": genresSeederObj[album.genre_id],
                        //     "release_date": album.release_date,
                        //     "cover": album.cover
                        // })
                        // const artist = await db.Artist.findOne({where:{dzId: artistDzId}})
                        // artist.setAlbums(createdAlbum)
                        //
                        // setTimeout(async ()=>{
                        //     const {data:songFetch} = await axios.get(`https://api.deezer.com/album/${album.id}/tracks`)
                        //     songFetch.data.map(async(song:any)=>{
                        //         // console.log(song)
                        //         const songCreated = await db.Song.create({
                        //             "dzId": song.id,
                        //             "title": song.title,
                        //             "preview": song.preview,
                        //             "image": album.cover,
                        //             "duration": song.duration
                        //         })
                        //         artist.setSongs(songCreated)
                        //         createdAlbum.setSongs(songCreated)
                        //     })
                        //     // console.log(songFetch.data)
                        // }, 5000)
                    // })
        //         })
        //         // console.log(genres)
        //         res.send(genres)
        //     })
        // );
    // const artistDb = await db.Artist.findAll()
    // res.send(artistDb)
})

seederRouter.get('/songs', async(_req, res)=>{

    songBase.map((songs)=>{
        songs.data.map(async(song)=>{
            await db.Song.create({
                "dzId": song.id,
                "title": song.title,
                "preview": song.preview,
                "duration": song.duration
            })
        })
    })
    res.send('S')
    // let links:string[] = []
    // albumBase.map(albums=>albums.data.map(album=> links.push(`https://api.deezer.com/album/${album.id}/tracks`)))
    // axios.all(links.map(link=> axios.get(link)))
    //     .then(axios.spread((...songs)=>{
    //         let allSongs:any[] = []
    //         songs.map(song=>{
    //             let albumDzId = song.config.url!.match(/\d/g)!.join("");
    //             let songs = song.data.data
    //             let obj = {albumId:albumDzId, data:songs}
    //             allSongs.push(obj)
    //         })
    //         res.send(allSongs)
    //     }))
    const mapped = Object.entries(genresSeederObj).map(async([k,v]) => {
        const createdGenre = await db.Genre.create({
            "dzId": k,
            "name": v
        })
    });
    // const albumsDB = await db.Album.findAll()
    // albumsDB.map((albumDb: any) => {
    //     console.log(albumDb.dzId)
    // })
    // console.log(albumsDB)
    // res.send(genresSeeder[197])
    // const albumsDB = await db.Album.findAll()
    // axios.all(albumsDB.map((albumDb: any)=>axios.get(`https://api.deezer.com/album/${albumDb.dzId}/tracks`)))
    //     .then(axios.spread((...songs)=>{
    //         songs.map(async(song: any)=>{
    //             let genresArr:any = []
    //             let albumDzId = song.config.url!.match(/\d/g)!.join("");
    //
    //             console.log(song.data.data)
    //
    //
    //         })
    //     }))

})

seederRouter.get('/full', async(_req, res)=>{

    try{
        artistBase.map(async(artist)=>{
            await db.Artist.create({
                // let createdArtist = await db.Artist.create({
                "dzId": artist.dzId,
                "name": artist.name,
                "url_small": artist.url_small,
                "url_medium": artist.url_medium,
                "url_big": artist.url_big,
                "url_xl": artist.url_xl
            })
        })
    } catch (e){
        res.send({error: 'error in artist creation'})
    }

    try{
        songBase.map((songs)=>{
            songs.data.map(async(song)=>{
                await db.Song.create({
                    "dzId": song.id,
                    "title": song.title,
                    "preview": song.preview,
                    "duration": song.duration
                })
            })
        })

        Object.entries(genresSeederObj).map(async([k,v]) => {
            await db.Genre.create({
                "dzId": k,
                "name": v
            })
        });
    } catch (e) {
        res.send({error: 'error in song/genre creation'})
    }

    try{
        albumBase.map(albumInfo =>{
            albumInfo.data.map(async(albums)=>{
                let createdAlbum = await db.Album.create({
                    "dzId": albums.id,
                    "name": albums.title,
                    "release_date": albums.release_date,
                    "cover_small": albums.cover_small,
                    "cover_medium": albums.cover_xl,
                    "cover_big": albums.cover_xl,
                    "cover_xl": albums.cover_xl
                })
                const artist = await db.Artist.findOne({where: {dzId: albumInfo.artistId}})
                artist.setAlbums(createdAlbum)

                let filterSongs = songBase.filter(songInfo=> songInfo.albumId === String(albums.id) )
                filterSongs.map(songInfo=>songInfo.data.map(async(song)=>{
                    let stringId = String(song.id)
                    let genreString = String(albums.genre_id)
                    try{
                        const songDb = await db.Song.findOne({where:{dzId: stringId}})
                        artist.setSongs(songDb)
                        createdAlbum.setSongs(songDb)
                        songDb.cover_small = albums.cover_small
                        songDb.cover_medium = albums.cover_medium
                        songDb.cover_big = albums.cover_big
                        songDb.cover_xl = albums.cover_xl
                        await songDb.save()
                        const genreDb = await db.Genre.findOne({where:{dzId: genreString}})
                        genreDb.setAlbums(createdAlbum)
                        genreDb.setSongs(songDb)
                    } catch (e) {
                        console.log(e)
                    }
                }))
            })
        })
    } catch (e) {
        res.send({error: 'error in album creation'})
    }
    res.send('DONE')
})