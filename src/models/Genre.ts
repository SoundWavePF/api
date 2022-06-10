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
        static associate(models: any){
            Genre.hasMany(models.Album)
            Genre.hasMany(models.Song)
        }
    }
    Genre.init({
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        dzId:{
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {sequelize,
        timestamps: false,
        modelName: 'Genre'
    });
    return Genre;
}
