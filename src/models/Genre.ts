'use strict'

import {Model} from 'sequelize';

interface GenreAttributes {
    id: number;
    name: string;
    dzId: number;
}

module.exports = (sequelize:any, DataTypes:any)=>{
    class Genre extends Model<GenreAttributes>
        implements GenreAttributes{
        id!: number;
        name!: string;
        dzId!: number;
        // static associate(models: any){
        //     // Genre.hasMany(models.Album, {foreignKey: 'genreId'})
        //     // Genre.hasMany(models.Album)
        // }
    }
    Genre.init({
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dzId:{
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING,
        }
    }, {sequelize,
        timestamps: false,
        modelName: 'Genre'
    });
    return Genre;
}
