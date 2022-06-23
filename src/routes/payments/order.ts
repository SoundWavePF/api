require('dotenv').config();
import {Router} from "express";
import db from "../../models/db";
const stripe = require('stripe')('sk_test_51LBmZHGiBadTHkTWdrJaHQgt9mudyPqVXlvlYs1Y8caeB71sIftSKujkSHvLw6GAoDMwlGwC1OdtccKRSkEB3eZT00bw2hCjdT');

export const orderRouter = Router();

orderRouter.post('/', async (req, res) => {
    const { artistId, userEmail, amount, stripeId } = req.body;
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
            cancel_url: `${process.env.API_URL}/order/failure?session_id={CHECKOUT_SESSION_ID}`,
            payment_intent_data: {
                application_fee_amount: 1,
                transfer_data: {
                    destination: stripeId
                    ,
                },
            },
        });
        const donation = await db.donation.create({
            id: session.id,
            amount: amount,
            status: 'pending',
        });
        await artist.addDonation(donation);
        if(userEmail){
        const userExists = await db.user.findOne({where: {email: userEmail}});
            await userExists.addDonation(donation);
        }
        console.log(session.url)
        return res.send({url:session.url});
    } catch (e:any) {
        return res.send({message: e.message})
    }
})

orderRouter.get('/success', async (req, res) => {
    console.log('body', req.body)
    console.log('query', req.query)
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const donation = await db.donation.findOne({where: {id: session.id}});
    donation.status = 'success';
    await donation.save();
    return res.redirect(`${process.env.CLIENT_URL}/artist/${donation.artistId}`);
})

orderRouter.get('/failure', async (req, res) => {
    console.log('body', req.body)
    console.log('query', req.query)
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const donation = await db.donation.findOne({where: {id: session.id}});
    donation.status = 'cancelled';
    await donation.save();
    return res.redirect(`${process.env.CLIENT_URL}/artist/${donation.artistId}`);
})