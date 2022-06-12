import { Router } from 'express';
const bcrypt = require('bcrypt');
import db from '../../models/db';
const { User } = db;

export const registerRouter = Router();

registerRouter.post('/', async (req, res)=>{
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        return res.send({error: 'All fields are required'})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const lookingForUser = await User.findOne({where: {username}})
        const lookingForEmail = await User.findOne({where: {email}})
        if(lookingForUser && lookingForEmail){
            return res.send({error: 'User already exists'})
        }
        if(lookingForUser){
            return res.send({error: 'Username is already taken'})
        }
        if(lookingForEmail){
            return res.send({error: 'Email already exists'})
        }
        const createNewUser = await User.create({
            username,
            email,
            password: hashedPassword
        })
        return res.send({status: 'success'})
    } catch (e: any) {
        return res.send({error: e.message})
    }


})