'use strict'

import {Model} from 'sequelize';


interface ArtistAttributes {
    id: number;
    name: string;
    plays: number;
    url_avatar: string;
    dzId: number;
}

module.exports = (sequelize:any, DataTypes:any)=>{
    class Artist extends Model<ArtistAttributes>
        implements ArtistAttributes{
            id!: number;
            name!: string;
            plays!: number;
            url_avatar!: string;
            dzId!: number;
            static associate(models: any){
                Artist.belongsTo(models.User)
                Artist.hasMany(models.Song)
                Artist.hasMany(models.Album)
            }

    }
    Artist.init({
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        dzId:{
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^[A-Z a-z]+$/g,
                    msg: 'Name contains invalid characters'
                }
            }
        },
        plays:{
            type: DataTypes.INTEGER
        },
        url_avatar:{
            type: DataTypes.STRING, validate:{isUrl: true}
        }
    }, {sequelize,
        timestamps: false,
        modelName: 'Artist'
    });
    return Artist;
}
