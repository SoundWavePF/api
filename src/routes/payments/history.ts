import {Router} from "express";
import db from "../../models/db";
import {DonationsUserHistory, DonationsArtistHistory} from "../../interfaces";

export const donationHistoryRouter = Router();

donationHistoryRouter.get('/:artistId', async (req, res) => {
    const {artistId} = req.params;
    try{
        const artist = await db.artist.findOne({where: {id: artistId}});
        if(!artist){
            return res.status(404).send({message: 'Artist not found'})
        }
        const donations = await db.donation.findAll({where: {artistId}, order:[['createdAt', 'DESC']], include: [{model: db.user, attributes: {exclude: ['password']}}]});
        let onlySuccess = donations.filter((donation:DonationsArtistHistory) => donation.status === 'success');

        return res.send(onlySuccess);
    } catch (e:any) {
        return res.send({message: e.message})
    }
})

donationHistoryRouter.post('/', async (req, res) => {
    const {email} = req.body;
    try{
        const user = await db.user.findOne({where: {email}});
        if(!user){
            return res.status(404).send({message: 'User not found'})
        }
        const donations = await db.donation.findAll({where: {userId: user.id}, order:[['createdAt', 'DESC']], include: [{model: db.artist}]});
        let onlySuccess = donations.filter((donation:DonationsUserHistory) => donation.status === 'success');

        return res.send(onlySuccess);
    } catch (e:any) {
        return res.send({message: e.message})
    }
})