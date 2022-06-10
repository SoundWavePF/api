import {Router} from "express";
import axios from '../../../node_modules/axios';
import artistSeeder from './artistSeed.json'
import genresSeeder from './genresSeed.json'
import artistBase from './artistData.json'
import albumBase from './albumData.json'
import songBase from './songsData.json'
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
    // artistBase.map(async(artist)=>{
    //                 await db.Artist.create({
    //                 // let createdArtist = await db.Artist.create({
    //                     "dzId": artist.dzId,
    //                     "name": artist.name,
    //                     "url_small": artist.url_small,
    //                     "url_medium": artist.url_medium,
    //                     "url_big": artist.url_big,
    //                     "url_xl": artist.url_xl
    //                 })
    // })
    // res.send(artistBase)
    axios.all(Object.keys(artistSeeder).map((id) => axios.get(`https://api.deezer.com/artist/${id}`)))
        .then(axios.spread((...artists) => {
            let artistResponse:any[] = []
            artists.map(async (artist)=> {
                artistResponse.push(artist.data)
                // await db.Artist.create({
                // // let createdArtist = await db.Artist.create({
                //     "dzId": artist.data.id,
                //     "name": artist.data.name,
                //     "url_small": artist.data.picture_small,
                //     "url_medium": artist.data.picture_medium,
                //     "url_big": artist.data.picture_big,
                //     "url_xl": artist.data.picture_xl
                // })
                // console.log(artist.data.name)
                // let {data: AlbumFetch} = await axios.get(`https://api.deezer.com/artist/${artist.data.id}/albums`)
                // console.log(AlbumFetch)
            })
            res.send(artistResponse)
        })
    );

    // //const artistDb = await db.Artist.findAll()


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
        Object.entries(genresSeederObj).map(async([k,v]) => {
            await db.Genre.create({
                "dz_Id": k,
                "name": v,
                "type": 'genre'
            })
        });
    } catch (e) {
        res.send({error: 'error in genre creation'})
    }



    try{
        artistBase.map(async(artist)=>{
            const createdArtist = await db.Artist.create({
                "dz_Id": artist.id,
                "name": artist.name,
                "image_small": artist.picture_small,
                "image_medium": artist.picture_medium,
                "image_big": artist.picture_big,
                "type": artist.type
            })

            albumBase.filter(album=>album.artistId===String(artist.id))[0].data
                .map(async(album)=>{
                    const createdAlbum = await db.Album.create({
                        "dz_Id": album.id,
                        "name": album.title,
                        "image_small": album.cover_small,
                        "image_medium": album.cover_medium,
                        "image_big": album.cover_big,
                        "release_date": album.release_date,
                        "type": album.type
                    })
                    const albumGenre = String(album.genre_id)
                    const genreDb = await db.Genre.findOne({where:{dz_Id: albumGenre}})
                    genreDb.addAlbums(createdAlbum)
                    createdArtist.addAlbums(createdAlbum)
                    // genreDb.setSongs(songDb)

                    songBase.filter(songs => songs.albumId === String(album.id))[0].data.map(async(song)=>{
                        const createdSong = await db.Song.create({
                            "dz_Id": song.id,
                            "title": song.title,
                            "artist": song.artist.name,
                            "preview": song.preview,
                            "image_small": album.cover_small,
                            "image_medium": album.cover_medium,
                            "image_big": album.cover_big,
                            "reproductions": song.track_position,
                            "duration": song.duration,
                            "genre": genreDb.name,
                            "album": album.title,
                            "type": song.type,
                            "artist_id_reference": song.artist.id,
                            "genre_id_reference": genreDb.dz_Id,
                            "album_id_reference": album.id
                        })
                        createdArtist.addSongs(createdSong)
                        genreDb.addSongs(createdSong)
                        // genreDb.setSongs(createdSong)
                        createdAlbum.addSongs(createdSong)
                    })
                })
        })
    } catch (e){
        res.send({error: 'error in creation'})
    }
    // try{
        // songBase.map((songs)=>{
        //     songs.data.map(async(song)=>{
        //         await db.Song.create({
        //             "dz_Id": song.id,
        //             "title": song.title,
        //             "artist": artist.name,
        //             "preview": song.preview,
        //             "image_small": `https://e-cdns-images.dzcdn.net/images/cover/${song.md5_image}/56x56-000000-80-0-0.jpg`,
        //             "image_medium": `https://e-cdns-images.dzcdn.net/images/cover/${song.md5_image}/250x250-000000-80-0-0.jpg`,
        //             "image_big": `https://e-cdns-images.dzcdn.net/images/cover/${song.md5_image}/500x500-000000-80-0-0.jpg`,
        //             "duration": song.duration
        //         })
        //     })
        // })
    //
    //     Object.entries(genresSeederObj).map(async([k,v]) => {
    //         await db.Genre.create({
    //             "dzId": k,
    //             "name": v
    //         })
    //     });
    // } catch (e) {
    //     res.send({error: 'error in genre creation'})
    //     // res.send({error: 'error in song/genre creation'})
    // }

    // try{
    //     albumBase.map(albumInfo =>{
    //         albumInfo.data.map(async(albums)=>{
    //             let createdAlbum = await db.Album.create({
    //                 "dzId": albums.id,
    //                 "name": albums.title,
    //                 "release_date": albums.release_date,
    //                 "cover_small": albums.cover_small,
    //                 "cover_medium": albums.cover_xl,
    //                 "cover_big": albums.cover_xl,
    //                 "cover_xl": albums.cover_xl
    //             })
    //             const artist = await db.Artist.findOne({where: {dzId: albumInfo.artistId}})
    //             artist.setAlbums(createdAlbum)
    //
    //             let filterSongs = songBase.filter(songInfo=> songInfo.albumId === String(albums.id) )
    //             filterSongs.map(songInfo=>songInfo.data.map(async(song)=>{
    //                 let stringId = String(song.id)
    //                 let genreString = String(albums.genre_id)
    //                 try{
    //                     const songDb = await db.Song.findOne({where:{dzId: stringId}})
    //                     artist.setSongs(songDb)
    //                     createdAlbum.setSongs(songDb)
    //                     songDb.cover_small = albums.cover_small
    //                     songDb.cover_medium = albums.cover_medium
    //                     songDb.cover_big = albums.cover_big
    //                     songDb.cover_xl = albums.cover_xl
    //                     await songDb.save()
    //                     const genreDb = await db.Genre.findOne({where:{dzId: genreString}})
    //                     genreDb.setAlbums(createdAlbum)
    //                     genreDb.setSongs(songDb)
    //                 } catch (e) {
    //                     console.log(e)
    //                 }
    //             }))
    //         })
    //     })
    // } catch (e) {
    //     res.send({error: 'error in album creation'})
    // }
    res.send('DONE')
})