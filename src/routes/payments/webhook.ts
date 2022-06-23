import {Router, raw} from "express";
import db from "../../models/db";

export const webhookRouter = Router();

webhookRouter.post('/', raw({type: 'application/json'}), async (req, res) => {
    console.log(req.body)
    return res.send({message: 'Webhook received'})
})