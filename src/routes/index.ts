import {Router} from 'express';
import {seederRouter} from "./seeder";
import {chargedbSongRouter} from "./chargedbSong";
import {senddbSongRouter} from "./senddbSong";

export const routes = Router();

routes.use('/seeder', seederRouter)
routes.use('/chargedbSong', chargedbSongRouter)
routes.use('/senddbSong', senddbSongRouter)