'use strict'

import {Model} from 'sequelize';


interface ArtistAttributes {
    id: string;
    dz_Id: string;
    name: string;
    image_small: string;
    image_medium: string;
    image_big: string;
    type: string;
}

module.exports = (sequelize:any, DataTypes:any)=>{
    class Artist extends Model<ArtistAttributes>
        implements ArtistAttributes{
            id!: string; //uid
            dz_Id!: string;
            name!: string;
            image_small!: string; //cambiar url image
            image_medium!: string;
            image_big!: string;
            type!: string;
            static associate(models: any){
                Artist.belongsTo(models.User)
                Artist.hasMany(models.Song)
                Artist.hasMany(models.Album)
            }

    }
    Artist.init({
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        dz_Id:{
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_small:{
            type: DataTypes.STRING, validate:{isUrl: true}
        },
        image_medium:{
            type: DataTypes.STRING, validate:{isUrl: true}
        },
        image_big:{
            type: DataTypes.STRING, validate:{isUrl: true}
        },
        type:{
            type: DataTypes.STRING,
        }
    }, {sequelize,
        timestamps: false,
        modelName: 'Artist'
    });
    return Artist;
}
