require('dotenv').config();
import { Sequelize } from 'sequelize-typescript'
// import {exampleModel} from './'

export const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    models: [], //models:[exampleModel]
    logging: false
})