import {Router} from 'express';
import db from '../../models/db';
import artistApi from '../charge/artistApi.json';
const wiki = require('wikipedia');

export const artistdescriptionRouter = Router();


artistdescriptionRouter.get('/', async (_req, res) => {
    artistApi.map(async (artist) => {
        let artistDb;
        try{
            artistDb = await db.artist.findOne({where: {dz_Id: artist.id}});
            if(!artistDb) {
                return console.log(`${artist.name} not found in DB`);
            }
            let page = await wiki.page(artistDb.name);
            let summary = await page.summary();
            if(summary.extract.includes('may refer') || summary.extract.includes('may be referred to') || summary.extract.includes('may be referred to as') || summary.extract.includes('given name and a surname')) {
                page = await wiki.page(`${artistDb.name}_(singer)`);
                summary = await page.summary();
                artistDb.description = summary.extract;
                await artistDb.save();
                if(!summary.extract){
                    artistDb.description = 'No description found';
                    await artistDb.save();
                    return console.log(`${artistDb.name} description updated`);
                }
                return console.log(`${artistDb.name} description updated`);
            }
            if(!summary.extract){
                artistDb.description = 'No description found';
                await artistDb.save();
                return console.log(`${artistDb.name} description updated`);
            }
            artistDb.description = summary.extract;
            await artistDb.save();
            return console.log(`${artistDb.name} description updated`);
        } catch(err){
            artistDb.description = 'No description found';
            await artistDb.save();
            return console.log(`${artistDb.name} description updated`);
        }
    });
    return res.send('done');
})