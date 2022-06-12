'use strict'

import {Model} from 'sequelize';

interface GenreAttributes {
    id: string;
    dz_Id: number;
    name: string;
    type: string;
}

module.exports = (sequelize:any, DataTypes:any)=>{
    class Genre extends Model<GenreAttributes>
        implements GenreAttributes{
        id!: string; //uid
        dz_Id!: number;
        name!: string;
        type!:string
        static associate(models: any){
            Genre.hasMany(models.Album)
            Genre.hasMany(models.Song)
        }
    }
    Genre.init({
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        dz_Id:{
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
    }, {sequelize,
        timestamps: false,
        modelName: 'Genre'
    });
    return Genre;
}
