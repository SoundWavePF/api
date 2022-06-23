require('dotenv').config();
import { server } from './src/app';
import db from "./src/models/db";
import express from "express";
import axios from "axios";

server.use(express.json())
//if reload is false, it will not reload the database
//if reload is true, it will reload the database
let reload = false;

db.sequelize.sync({ force: reload }).then(() => {
    server.listen(process.env.PORT, async () => {
        console.log(`Listening in port ${process.env.PORT}`)
        if(reload){
            console.log('Creating DB...')
            await axios.get(`http://localhost:3001/charge/one`)
            await axios.get(`http://localhost:3001/charge/two`)
            console.log('Patching DB...')
            await axios.get(`http://localhost:3001/asuser`)
            console.log('artist are now linked to a user in the DB')
            await axios.get(`http://localhost:3001/albumPatcher`)
            console.log('album are now patched with an artist in the DB')
        }
        console.log('DB created')
    })
});