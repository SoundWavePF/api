import {Router} from "express";
import db from "../../models/db";

export const playRouter = Router();

playRouter.post('/', async (req, res) => {
    const { songId, userEmail } = req.query;
    try{
        const song = await db.song.findOne({where: {id: songId}, include: [{model: db.artist, attributes: ['name']}, {model: db.album, attributes: ['name']}]});
        const user = await db.user.findOne({where: {email: userEmail}});
        const historyArray = user.history.map((song:any)=>song.id)
        if(historyArray.includes(songId)){
            let index = historyArray.indexOf(songId);
            const firstSlice = user.history.slice(0, index);
            const secondSlice = user.history.slice(index + 1);
            user.history = [...firstSlice, ...secondSlice];
        }
        user.history.push(song);
        song.reproductions = song.reproductions + 1;
        await song.save();
        await user.save();
        return res.send({message: 'Song added to history'});
    } catch (e:any) {
        return res.send({message: e.message});
    }
})