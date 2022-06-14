import { Router } from 'express';
// import { seederRouter } from "./seeder/seeder";
import send from "./send/send";
import {searchRouter, artistRouter, albumRouter, genreRouter, topRouter} from "./search";
import {favoriteRouter, playlistRouter, registerRouter, loginRouter} from './user';
import link from "./link/link";
import chargeJson from "./charge/chargeJson";
import charge from "./charge/charge";
import chargeTables from "./charge/chargeTables";

export const routes = Router();

// routes.use('/seeder', seederRouter)
routes.use('/send', send)
routes.use('/search', searchRouter)
routes.use('/favorite', favoriteRouter)
routes.use('/playlist', playlistRouter)
routes.use('/link', link)
routes.use('/chargeJson', chargeJson)
routes.use('/charge', charge)
routes.use('/chargedb', chargeTables)
// routes.use('/chargeAlbum', chargeAlbum)
// routes.use('/chargeGenre', chargeGenre)
routes.use('/artist', artistRouter)
routes.use('/album', albumRouter)
routes.use('/genre', genreRouter)
routes.use('/top', topRouter)
routes.use('/register', registerRouter)
routes.use('/login', loginRouter)
