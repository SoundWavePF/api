require('dotenv').config();
import {server} from './src/app';
import db from "./src/models/db";

server.use(express.json())
// db.sequelize.sync({force: true}).then(()=>{
db.sequelize.sync().then(()=>{
    server.listen(process.env.PORT, ()=>{
        console.log(`Listening in port ${3001}`)})
})