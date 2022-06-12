import {Router} from 'express';
import {seederRouter} from "./seeder";
import chargedbSong from "./charge/chargedbSong";
import send from "./send/send";
import {searchRouter, artistRouter, albumRouter, genreRouter, topRouter} from "./search";
import {favoriteRouter, playlistRouter} from './user';
import chargedbArtist from "./charge/chargedbArtist";
import link from "./link/link";
import chargeJson from "./charge/chargeJson";
import charge from "./charge/charge";
import chargeAlbum from "./charge/chargedbAlbum";
import chargeGenre from './charge/chargedbGenre'

export const routes = Router();

routes.use('/seeder', seederRouter)
routes.use('/chargedbSong', chargedbSong)
routes.use('/send', send)
routes.use('/search', searchRouter)
routes.use('/favorite', favoriteRouter)
routes.use('/playlist', playlistRouter)
routes.use('/chargedbArtist', chargedbArtist)
routes.use('/link', link)
routes.use('/chargeJson', chargeJson)
routes.use('/charge', charge)
routes.use('/chargeAlbum', chargeAlbum)
routes.use('/chargeGenre', chargeGenre)
routes.use('/artist', artistRouter)
routes.use('/album', albumRouter)
routes.use('/genre', genreRouter)
routes.use('/top', topRouter)