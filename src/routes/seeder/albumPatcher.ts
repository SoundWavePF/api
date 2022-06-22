import albumJson from './../seeder/jsons/albumpatcher.json';
import {Router} from 'express';
import db from '../../models/db';

export const albumPatcher = Router();

//patch album artist info in current db
albumPatcher.get('/', async (_req, res) => {
    await Promise.all(albumJson.map(async(album) => {
        const albumAux = await db.album.findOne({where: {dz_Id: album.id}})
        albumAux.artist = album.artist.name
        albumAux.save()
    }))
    return res.send({message: 'Albums patched'})
})