import {Router} from "express";
import db from "../../models/db";

export const historyRouter = Router();


historyRouter.post('/', async (req, res) => {
    const { email } = req.body;
    let history:any[] = []
    const user = await db.user.findOne({where: {email: email}, include: [{model: db.played}]});
    if(!user) {
        return res.send({message: 'User not found'});
    }
    await Promise.all(user.playeds.map(async(played:any) => {
        const song = await db.song.findOne({where: {id: played.songId}, include: [{model: db.album, attributes:['name']}, {model: db.artist, attributes:['name']}]});
        history.push(song);
    }))
    const obj = {
        id: user.id,
        username: user.username,
        email: user.email,
        history: history
    }
    return res.send(obj);
})