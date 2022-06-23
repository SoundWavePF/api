require('dotenv').config();
import {Router} from "express";
import db from "../../models/db";
import axios from "axios";
const stripe = require('stripe')('sk_test_51LBmZHGiBadTHkTWdrJaHQgt9mudyPqVXlvlYs1Y8caeB71sIftSKujkSHvLw6GAoDMwlGwC1OdtccKRSkEB3eZT00bw2hCjdT');

export const orderRouter = Router();

orderRouter.post('/', async (req, res) => {
    const { artistId, userEmail, amount } = req.body;
    try{
        const artist = await db.artist.findOne({where: {id: artistId}});
        if(!artist){
            return res.status(404).send({message: 'Artist not found'})
        }
        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price_data: {
                    currency: 'usd',
                    unit_amount: amount * 100,
                    product_data: {
                        name: artist.name,
                        description: 'Donation to ' + artist.name,
                        images: [artist.image_big]
                    }
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.API_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.API_URL}/order/failure`,
            payment_intent_data: {
                application_fee_amount: 1,
                transfer_data: {
                    destination: 'acct_1LDbJP2ecIuX88zt'
                    ,
                },
            },
        });
        axios.post(`${process.env.API_URL}/order/create`, {
            transactionId: session.id,
            artistId: artistId,
            userEmail: userEmail,
            amount: amount,
        })
        // return res.redirect(session.url);
        return res.send(session)
    } catch (e:any) {
        return res.send({message: e.message})
    }
})

orderRouter.get('/success', async (req, res) => {
    console.log('body', req.body)
    console.log('query', req.query)
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const donation = await db.donations.findOne({where: {id: session.id}});
    donation.status = 'success';
    await donation.save();
    return res.send({message: 'Donation successful'})
    // res.send(session)
})

orderRouter.get('/failure', async (req, res) => {
    console.log('body', req.body)
    console.log('query', req.query)
    res.send('failure')
})

orderRouter.post('/create', async (req, res) => {
    const {transactionId, artistId, userEmail, amount } = req.body;
    try {
        const artist = await db.artist.findOne({where: {id: artistId}});
        const userExists = await db.user.findOne({where: {email: userEmail}});
        const donation = await db.donations.create({
            id: transactionId,
            amount: amount,
            status: 'pending',
        });
        artist.addDonation(donation);
        if(userExists){
            userExists.addDonation(donation);
        }

        return res.send({message: 'Order created'})
    } catch (e:any) {
        return res.send({message: e.message})
    }
})