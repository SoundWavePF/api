require('dotenv').config();
import {server} from './src/app';
import {sequelize} from "./src/db";
import express from 'express';


server.use(express.json())
sequelize.sync({force: true}).then(()=>{
    server.listen(process.env.PORT, ()=>{
        console.log(`Listening in port ${3001}`)})
})
