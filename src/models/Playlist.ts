'use strict'

import {Model} from 'sequelize';


interface PlaylistAttributes {
    id: string;
    name: string;
    image_playlist: string;
}

module.exports = (sequelize:any, DataTypes:any)=>{
    class Playlist extends Model<PlaylistAttributes>
        implements PlaylistAttributes{
        id!: string; //UID
        name!: string;
        image_playlist!: string;
        static associate(models: any){
            Playlist.belongsTo(models.User)
            Playlist.belongsToMany(models.Song, {
                through: 'Playlist_Song'
            })
        }
    }
    Playlist.init({
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_playlist:{
            type: DataTypes.STRING,
        }
    }, {sequelize,
        timestamps: false,
        modelName: 'Playlist'
    });
    return Playlist;
}
