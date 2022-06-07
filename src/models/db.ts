// require('dotenv').config();
// import { Sequelize } from 'sequelize-typescript'
// import {Artist, User} from "./models";
//
// export const sequelize = new Sequelize({
//     database: process.env.DB_NAME,
//     dialect: 'postgres',
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     models: [Artist, User],
//     logging: false
// })

'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('../../node_modules/sequelize');
const basename = path.basename(__filename);
const db: any = {};
let sequelize: any = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`,
    {
        logging: false
    }
);

fs
    .readdirSync(__dirname)
    .filter((file: string) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
    })
    .forEach((file: any) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;