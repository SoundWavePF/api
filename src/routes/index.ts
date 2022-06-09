import {Router} from 'express';
import {seederRouter} from "./seeder/seeder";
import {searchRouter} from "./search/search";
import {favoriteRouter} from "./user/favorite";
import {playlistRouter} from "./user/playlist";

export const routes = Router();

routes.use('/seeder', seederRouter)
routes.use('/search', searchRouter)
routes.use('/favorite', favoriteRouter)
routes.use('/playlist', playlistRouter)