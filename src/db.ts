require('dotenv').config();
import { Sequelize } from 'sequelize-typescript'
import {Artist, User} from "./models";

export const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    models: [Artist, User],
    logging: false
})