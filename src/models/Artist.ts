'use strict'

import {Model} from 'sequelize';


interface ArtistAttributes {
    id: number;
    name: string;
    plays: number;
    url_small: string;
    url_medium: string;
    url_big: string;
    url_xl: string;
    dzId: string;
}

module.exports = (sequelize:any, DataTypes:any)=>{
    class Artist extends Model<ArtistAttributes>
        implements ArtistAttributes{
            id!: number;
            name!: string;
            plays!: number;
            url_small!: string;
            url_medium!: string;
            url_big!: string;
            url_xl!: string;
            dzId!: string;
            static associate(models: any){
                Artist.belongsTo(models.User)
                Artist.hasMany(models.Song)
                Artist.hasMany(models.Album)
            }

    }
    Artist.init({
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dzId:{
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        plays:{
            type: DataTypes.INTEGER
        },
        url_small:{
            type: DataTypes.STRING, validate:{isUrl: true}
        },
        url_medium:{
            type: DataTypes.STRING, validate:{isUrl: true}
        },
        url_big:{
            type: DataTypes.STRING, validate:{isUrl: true}
        },
        url_xl:{
            type: DataTypes.STRING, validate:{isUrl: true}
        }
    }, {sequelize,
        timestamps: false,
        modelName: 'Artist'
    });
    return Artist;
}
