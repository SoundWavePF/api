import {Router} from 'express';
import {seederRouter} from "./seeder/seeder";

export const routes = Router();

routes.use('/seeder', seederRouter)