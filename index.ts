require('dotenv').config();
import {server} from './src/app';
import db from "./src/models/db";
import express from 'express';

server.use(express.json())
db.sequelize.sync({force: true}).then(()=>{
    server.listen(process.env.PORT, ()=>{
        console.log(`Listening in port ${3001}`)})
})