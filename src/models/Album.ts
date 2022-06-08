'use strict'

import {Model} from 'sequelize';


interface AlbumAttributes {
    id: number;
    name: string;
    genre: number;
    release_date: number;
    cover: string;
    dzId: number;
}

module.exports = (sequelize:any, DataTypes:any)=>{
    class Album extends Model<AlbumAttributes>
        implements AlbumAttributes{
        id!: number;
        name!: string;
        genre!: number;
        release_date!: number;
        cover!: string;
        dzId!: number;
        static associate(models: any){
            Album.hasMany(models.Song)
            Album.belongsTo(models.Artist, models.Genre)
        }
    }
    Album.init({
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
        },
        genre:{
            type: DataTypes.STRING
        },
        release_date:{
            type: DataTypes.STRING
        },
        cover:{
            type: DataTypes.STRING
        }
    }, {sequelize,
        timestamps: false,
        modelName: 'Album'
    });
    return Album;
}
