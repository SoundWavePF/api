import {Router} from 'express';
import {seederRouter} from "./seeder/seeder";
import {chargedbSongRouter} from "./chargedbSong";
import {senddbSongRouter} from "./senddbSong";
import {searchRouter, artistRouter, albumRouter, genreRouter} from "./search";
//TODO: refactor in one
import {favoriteRouter} from "./user/favorite";
import {playlistRouter} from "./user/playlist";

export const routes = Router();

routes.use('/seeder', seederRouter)
routes.use('/chargedbSong', chargedbSongRouter)
routes.use('/senddbSong', senddbSongRouter)
routes.use('/search', searchRouter)
routes.use('/favorite', favoriteRouter)
routes.use('/playlist', playlistRouter)
routes.use('/artist', artistRouter)
routes.use('/album', albumRouter)
routes.use('/genre', genreRouter)
