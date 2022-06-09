'use strict'

import {Model} from 'sequelize';


interface AlbumAttributes {
    id: number;
    name: string;
    release_date: string;
    cover: string;
    dzId: string;
}

module.exports = (sequelize:any, DataTypes:any)=>{
    class Album extends Model<AlbumAttributes>
        implements AlbumAttributes{
        id!: number;
        name!: string;
        release_date!: string;
        cover!: string;
        dzId!: string;
        static associate(models: any){
            Album.belongsTo(models.Artist)
            // Album.belongsTo(models.Genre)
            Album.hasMany(models.Song)
            // Album.belongsTo(models.Genre, {foreignKey: 'id', targetKey:'genreId'})
        }
    }
    Album.init({
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
