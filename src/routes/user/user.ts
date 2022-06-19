import { Router } from "express";
import db from '../../models/db'
const app = Router()
const { user } = db;

app.post('/', async (req, res) => {
    // let favoriteArr: number[] = [];
    const { email } = req.body;
    console.log(email)
    try {
        const userDb = await user.findOne({
            where: { email: email },
            include: [db.playlist, db.song],
        })
        const favoriteArr: number[] = userDb.songs?.map((e: any) => e.dz_Id)

        const userSend = {
            username: userDb.username,
            image: userDb.image_avatar,
            rol: userDb.rol,
            favorite: favoriteArr,
            // playlist: playlistArr, // queda pendiente lo de la playlist
        }
        // console.log(favoriteArr)
        res.send(userSend)
    } catch (err) {
        console.log(err)
    }
})


export default app;