import { Router } from 'express';
import db from '../../models/db';
const bcrypt = require('bcrypt');
const { User } = db;

export const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.send({error: 'All fields are required'})
    }
    try {
        const user = await User.findOne({
            where: {email}
        })
        if(!user){
            return res.send({error: `User with email ${email} not found`})
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.send({error: 'Invalid password'})
        }
        return res.send({status: 'success'})
    } catch (e: any) {
        return res.send({error: e.message})
    }
})