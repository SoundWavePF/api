import {Router} from 'express';
import {seederRouter} from "./seeder";
import {chargedbSongRouter} from "./chargedbSong";
import {senddbSongRouter} from "./senddbSong";
import {searchRouter} from "./search/search";
import {favoriteRouter} from "./user/favorite";
import {playlistRouter} from "./user/playlist";

export const routes = Router();

routes.use('/seeder', seederRouter)
routes.use('/chargedbSong', chargedbSongRouter)
routes.use('/senddbSong', senddbSongRouter)
routes.use('/search', searchRouter)
routes.use('/favorite', favoriteRouter)
routes.use('/playlist', playlistRouter)
