import {Router} from "express";
import db from "../../models/db";
const bcrypt = require('bcrypt');

const cleanEmail = (text: string) => {
    let desired = text.replace(/[^\w\s]/gi, '')
    let email = desired.split(' ').join('').toLowerCase()
    return `${email}@gmail.com`;
}

const cleanUser = (text: string) => {
    let desired = text.replace(/[^\w\s]/gi, '')
    let username = desired.split(' ').join('').toLowerCase()
    return username;
}

export const artistAsUserRouter = Router();

artistAsUserRouter.get('/', async (_req, res) => {
    const artists = await db.artist.findAll();
    artists.map(async(artist:any) => {
        const hashedPassword = await bcrypt.hash('password', 10);
        const [user, created] = await db.user.findOrCreate(
            {where: {email: cleanEmail(artist.name)}, defaults: {
            email: cleanEmail(artist.name),
            password: hashedPassword,
            name: artist.name,
            username: cleanUser(artist.name),
            image_avatar: artist.image_medium,
            rol: 'artist',
        }})
        if(created) {
            await artist.setUser(user);
        }
    })
    return res.send({message: 'Artists as users created'});
})