import {Router} from 'express';
import {seederRouter} from "./seeder/seeder";
import {searchRouter} from "./search/search";
import {favoriteRouter} from "./user/favorite";

export const routes = Router();

routes.use('/seeder', seederRouter)
routes.use('/search', searchRouter)
routes.use('/favorite', favoriteRouter)