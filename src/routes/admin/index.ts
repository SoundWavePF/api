import { Router } from 'express';
import db from '../../models/db';

export const adminRouter = Router();

adminRouter.post('/stats', async (req, res) => {
    const {adminId} = req.body;
    try {
        const admin = await db.user.findOne({where: {id: adminId}});
        if(admin.rol==='admin'){
            const songStats = await db.sequelize.query(`SELECT COUNT(*) as totalSongs FROM songs`, {type: db.sequelize.QueryTypes.SELECT});
            const songsPlayCount = await db.sequelize.query(`SELECT SUM(reproductions) as totalPlayCount FROM songs`, {type: db.sequelize.QueryTypes.SELECT});
            const adminUsers = await db.sequelize.query(`SELECT COUNT(*) as totalAdminUsers FROM users WHERE rol='admin'`, {type: db.sequelize.QueryTypes.SELECT});
            const regularUsers = await db.sequelize.query(`SELECT COUNT(*) as totalRegularUsers FROM users WHERE rol='user'`, {type: db.sequelize.QueryTypes.SELECT});
            const totalUsers = await db.sequelize.query(`SELECT COUNT(*) as totalUsers FROM users`, {type: db.sequelize.QueryTypes.SELECT});
            const albumStats = await db.sequelize.query(`SELECT COUNT(*) as totalAlbums FROM albums`, {type: db.sequelize.QueryTypes.SELECT});
            const artistStats = await db.sequelize.query(`SELECT COUNT(*) as totalArtists FROM artists`, {type: db.sequelize.QueryTypes.SELECT});
            const genreStats = await db.sequelize.query(`SELECT COUNT(*) as totalGenres FROM genres`, {type: db.sequelize.QueryTypes.SELECT});
            const playlistStats = await db.sequelize.query(`SELECT COUNT(*) as totalPlaylists FROM playlists`, {type: db.sequelize.QueryTypes.SELECT});
            return res.send({...songStats[0], ...adminUsers[0], ...regularUsers[0], ...totalUsers[0], ...albumStats[0], ...artistStats[0], ...genreStats[0], ...playlistStats[0], ...songsPlayCount[0]});
        }
        return res.send({message: 'You are not an admin'});
    }catch (e:any) {
        return res.send({message: e.message})
    }
})

adminRouter.post('/users', async(req,res)=>{
    const { adminId } = req.body;
    try {
        const admin = await db.user.findOne({where: {id: adminId}});
        if(admin.rol=== 'admin') {
            const users = await db.user.findAll({attributes: {exclude: ['password']}});
            return res.send(users);
        }
        return res.send({message: 'You are not an admin'})
    } catch (e:any) {
        return res.send({error: e.message})
    }
})

adminRouter.post('/update', async(req,res)=>{
    const { adminId, userId, field, newData } = req.body;
    try {
        const admin = await db.user.findOne({where: {id: adminId}});
        if(admin.rol=== 'admin') {
            const user = await db.user.findOne({where: {id: userId}});
            if(field === 'email'){
                user.email = newData;
                await user.save();
                return res.send({message: 'Email updated'});
            }
            if(field === 'password'){
                user.password = newData;
                await user.save();
                return res.send({message: 'Password updated'});
            }
            if(field === 'username'){
                user.username = newData;
                await user.save();
                return res.send({message: 'Username updated'});
            }
            if(field === 'avatar'){
                user.image_avatar = newData;
                await user.save();
                return res.send({message: 'Avatar updated'});
            }
            if(field==='rol'){
                user.rol = newData;
                await user.save();
                return res.send({message: 'Rol updated'});
            }
        }
        return res.send({message: 'You are not an admin'});
    } catch (e:any) {
        return res.send({error: e.message})
    }
})

adminRouter.post('/accept', async(req,res)=>{
    const { adminId, userId } = req.body;
    try {
        const admin = await db.user.findOne({where: {id: adminId}});
        if(admin.rol=== 'admin') {
            const user = await db.user.findOne({where: {id: userId}});
            if(user.rol=== 'artist'){
                return res.send({message: 'User is already an artist'});
            }
            user.rol = 'artist';
            user.requested_artist = false;
            await user.save();
            return res.send({message: 'User accepted'});
        }
        return res.send({message: 'You are not an admin'});
    } catch (e:any) {
        return res.send({error: e.message})
    }
})

adminRouter.post('deactivate', async(req,res)=>{
    const { adminId, userId } = req.body;
    try {
        const admin = await db.user.findOne({where: {id: adminId}});
        if (admin.rol === 'admin') {
            const user = await db.user.findOne({where: {id: userId}});
            if (user.rol === 'admin') {
                return res.send({message: 'You cannot delete an admin'});
            }
            if(user.deactivated===true){
                return res.send({message: 'User is already deactivated'});
            }
            user.deactivated = true;
            await user.save();
            return res.send({message: 'User deleted'});
        }
        return res.send({message: 'You are not an admin'});
    } catch (e:any) {
        return res.send({error: e.message})
    }
})