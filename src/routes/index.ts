import { Router } from "express";
import send from "./send/send";
import {searchRouter, artistRouter, albumRouter, genreRouter, topRouter, songRouter,} from "./search";
import {favoriteRouter, playlistRouter, registerRouter, loginRouter, updateRouter, artistRequestRouter, deactivateRouter, infoRouter, playRouter, historyRouter,} from "./user";
import link from "./link/link";
import chargeJson from "./charge/chargeJson";
import charge from "./charge/charge";
import chargeTables from "./charge/chargeTables";
import {adminRouter} from "./admin";
import {artistSongRouter, artistAlbumRouter, artistProfileRouter, artistDescriptionRouter, artistStatsRouter} from "./artist";
import {artistAsUserRouter} from "./seeder/loader";
import {albumPatcher} from "./seeder/albumPatcher";
import {artistdescriptionRouter} from "./seeder/artistdescription";
import {orderRouter, linkPaymentRouter, donationHistoryRouter} from "./payments";

export const routes = Router();

routes.use("/send", send);
routes.use("/search", searchRouter);
routes.use("/favorite", favoriteRouter);
routes.use("/playlist", playlistRouter);
routes.use("/link", link);
routes.use("/chargeJson", chargeJson);
routes.use("/charge", charge);
routes.use("/chargedb", chargeTables);
routes.use('/artist', artistRouter)
routes.use('/album', albumRouter)
routes.use('/genre', genreRouter)
routes.use('/top', topRouter)
routes.use('/register', registerRouter)
routes.use('/login', loginRouter)
routes.use('/update', updateRouter)
routes.use('/admin', adminRouter)
routes.use('/requestArtistStatus', artistRequestRouter)
routes.use('/deactivate', deactivateRouter)
routes.use('/info', infoRouter)
routes.use('/artistpanel/album', artistAlbumRouter)
routes.use('/artistpanel/song', artistSongRouter)
routes.use('/artistpanel/profile', artistProfileRouter)
routes.use('/play', playRouter)
routes.use('/history', historyRouter)
routes.use('/artistpanel/description', artistDescriptionRouter)
routes.use('/asuser', artistAsUserRouter)
routes.use('/song', songRouter)
routes.use('/artistpanel/stats', artistStatsRouter)
routes.use('/albumPatcher', albumPatcher)
routes.use('/order', orderRouter)
routes.use('/linkPayment', linkPaymentRouter)
routes.use('/descriptionPatcher', artistdescriptionRouter)
routes.use('/order/history', donationHistoryRouter)
