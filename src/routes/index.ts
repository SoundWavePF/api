import { Router } from 'express';
import { seederRouter } from "./seeder/seeder";
import send from "./send/send";
import { searchRouter } from "./search/search";
import { favoriteRouter } from "./user/favorite";
import { playlistRouter } from "./user/playlist";
import link from "./link/link";
import chargeJson from "./charge/chargeJson";
import charge from "./charge/charge";
import chargeTables from "./charge/chargeTables";

export const routes = Router();

routes.use('/seeder', seederRouter)
routes.use('/send', send)
routes.use('/search', searchRouter)
routes.use('/favorite', favoriteRouter)
routes.use('/playlist', playlistRouter)
routes.use('/link', link)
routes.use('/chargeJson', chargeJson)
routes.use('/charge', charge)
routes.use('/chargedb', chargeTables)
