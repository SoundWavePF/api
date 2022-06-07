'use strict'

import {Model} from 'sequelize';


interface ArtistAttributes {
    id: number;
    name: string;
    plays: number;
    url_avatar: string;
}

module.exports = (sequelize:any, DataTypes:any)=>{
    class Artist extends Model<ArtistAttributes>
        implements ArtistAttributes{
            id!: number;
            name!: string;
            plays!: number;
            url_avatar!: string;
            static associate(models: any){
                Artist.belongsTo(models.User)
            }
    }
    Artist.init({
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
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
        modelName: 'Artist'
    });
    return Artist;
}
