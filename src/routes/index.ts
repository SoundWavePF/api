import {Router} from 'express';
import {seederRouter} from "./seeder";
import {chargedbSongRouter} from "./chargedbSong";
import {searchRouter, artistRouter, albumRouter, genreRouter} from "./search";
import {favoriteRouter, playlistRouter} from './user';

export const routes = Router();

routes.use('/seeder', seederRouter)
routes.use('/chargedbSong', chargedbSongRouter)
routes.use('/search', searchRouter)
routes.use('/favorite', favoriteRouter)
routes.use('/playlist', playlistRouter)
routes.use('/artist', artistRouter)
routes.use('/album', albumRouter)
routes.use('/genre', genreRouter)
