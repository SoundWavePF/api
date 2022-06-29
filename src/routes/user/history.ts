import {Router} from "express";
import db from "../../models/db";

export const historyRouter = Router();


historyRouter.post('/', async (req, res) => {
    const { email } = req.body;
    try{
        if(email === undefined) {
            return res.send({message: 'Email is required'});
        }
        let history:any[] = [];
        const user = await db.user.findOne({where: {email: email}, include: [{model: db.played}]});
        if(!user) {
            return res.send({message: 'User not found'});
        }
        for(let played of user.playeds) {
            const song = await db.song.findOne({where: {id: played.songId}, include: [{model: db.artist, attributes: ['id', 'name']}, {model: db.album, attributes: ['id', 'name']}]});
            history.push(song);
        }
        // await Promise.all(user.playeds.map(async(played:any) => {
        //     const song = await db.song.findOne({where: {id: played.songId}, include: [{model: db.album, attributes:['id', 'name']}, {model: db.artist, attributes:['id','name']}]});
        //     history.push(song);
        // }))
        const obj = {
            id: user.id,
            username: user.username,
            email: user.email,
            history: history.slice(0,20).reverse()
        }
        return res.send(obj);
    } catch (e:any) {
        return res.send({message: e.message});
    }
})