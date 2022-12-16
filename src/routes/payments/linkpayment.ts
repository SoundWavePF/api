require('dotenv').config();
import {Router} from "express";
import db from "../../models/db";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const linkPaymentRouter = Router();

linkPaymentRouter.post('/', async (req, res) => {
    const { email } = req.body;
    try{
        const user = await db.user.findOne({where: {email}});
        if(!user){
            return res.status(404).send({message: 'User not found'})
        }
        const artist = await db.artist.findOne({where: {userId: user.id}});
        if(!artist){
            return res.status(404).send({message: 'Artist not found'})
        }
        const account  = await stripe.accounts.create({
            country: 'US',
            type: 'express',
            email: email,
            capabilities: {
                transfers: {requested: true},
            },
            business_type: 'individual',
            business_profile: {url: 'https://www.soundwave.com'},
        });
        artist.stripe_Id = account.id;
        await artist.save();
        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: `${process.env.CLIENT_URL}/panel_artist`,
            return_url: `${process.env.CLIENT_URL}/panel_artist`,
            type: 'account_onboarding',
        });
        return res.send({url:accountLink.url});
    } catch (e:any) {
        return res.send({message: e.message})
    }
})