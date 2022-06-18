require('dotenv').config();
import { server } from './src/app';
import db from "./src/models/db";
import express from "express";
import axios from "axios";

server.use(express.json())

let reload = false;

db.sequelize.sync({ force: true }).then(() => {
//     db.sequelize.sync().then(() => {
    server.listen(process.env.PORT, async () => {
        console.log(`Listening in port ${process.env.PORT}`)
        // if(reload){
        //     console.log('Creating DB...')
        //     await axios.get(`http://localhost:3001/charge/one`)
        //     await axios.get(`http://localhost:3001/charge/two`)
        // }
        // console.log('\n' +
        //     '██████╗░██████╗░  ░█████╗░██████╗░███████╗░█████╗░████████╗███████╗██████╗░\n' +
        //     '██╔══██╗██╔══██╗  ██╔══██╗██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔════╝██╔══██╗\n' +
        //     '██║░░██║██████╦╝  ██║░░╚═╝██████╔╝█████╗░░███████║░░░██║░░░█████╗░░██║░░██║\n' +
        //     '██║░░██║██╔══██╗  ██║░░██╗██╔══██╗██╔══╝░░██╔══██║░░░██║░░░██╔══╝░░██║░░██║\n' +
        //     '██████╔╝██████╦╝  ╚█████╔╝██║░░██║███████╗██║░░██║░░░██║░░░███████╗██████╔╝\n' +
        //     '╚═════╝░╚═════╝░  ░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝░░░╚═╝░░░╚══════╝╚═════╝░')
    })
});