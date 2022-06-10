'use strict'

import {Model} from 'sequelize';


interface AlbumAttributes {
    id: string;
    dz_Id: string;
    name: string;
    release_date: string;
    image_small: string;
    image_medium: string;
    image_big: string;
    type: string;
}

module.exports = (sequelize:any, DataTypes:any)=>{
    class Album extends Model<AlbumAttributes>
        implements AlbumAttributes{
        id!: string; //UUID
        dz_Id!: string;//dz_id
        name!: string; //title
        image_small!: string; //cambiar cover a image
        image_medium!: string;
        image_big!: string;
        release_date!: string;
        type!: string;
        static associate(models: any){
            Album.belongsTo(models.Artist)
            Album.belongsTo(models.Genre)
            Album.hasMany(models.Song)
        }
    }
    Album.init({
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        dz_Id:{
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING,
        },
        release_date:{
            type: DataTypes.STRING
        },
        image_small:{
            type: DataTypes.STRING
        },
        image_medium:{
            type: DataTypes.STRING
        },
        image_big:{
            type: DataTypes.STRING
        },
        type:{
            type: DataTypes.STRING
        },
    }, {sequelize,
        timestamps: false,
        modelName: 'Album'
    });
    return Album;
}
