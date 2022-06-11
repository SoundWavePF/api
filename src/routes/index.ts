import {Router} from 'express';
import {seederRouter} from "./seeder/seeder";
import {chargedbSongRouter} from "./charge/chargedbSong";
import send from "./send/send";
import {searchRouter} from "./search/search";
import {favoriteRouter} from "./user/favorite";
import {playlistRouter} from "./user/playlist";
import chargedbArtist from "./charge/chargedbArtist";
import link from "./link/link";

export const routes = Router();

routes.use('/seeder', seederRouter)
routes.use('/chargedbSong', chargedbSongRouter)
routes.use('/send', send)
routes.use('/search', searchRouter)
routes.use('/favorite', favoriteRouter)
routes.use('/playlist', playlistRouter)
routes.use('/chargedbArtist', chargedbArtist)
routes.use('/link', link)
