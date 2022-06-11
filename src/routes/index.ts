import {Router} from 'express';
import {seederRouter} from "./seeder/seeder";
import {chargedbSongRouter} from "./charge/chargedbSong";
import {senddbSongRouter} from "./send/senddbSong";
import {searchRouter} from "./search/search";
import {favoriteRouter} from "./user/favorite";
import {playlistRouter} from "./user/playlist";
import chargedbArtist from "./charge/chargedbArtist";

export const routes = Router();

routes.use('/seeder', seederRouter)
routes.use('/chargedbSong', chargedbSongRouter)
routes.use('/senddbSong', senddbSongRouter)
routes.use('/search', searchRouter)
routes.use('/favorite', favoriteRouter)
routes.use('/playlist', playlistRouter)
routes.use('/chargedbArtist', chargedbArtist)
