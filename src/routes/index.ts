import {Router} from 'express';
import {seederRouter} from "./seeder/seeder";
import {searchRouter} from "./search/search";

export const routes = Router();

routes.use('/seeder', seederRouter)
routes.use('/search', searchRouter)