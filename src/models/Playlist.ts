'use strict'

import { Model } from 'sequelize';


interface PlaylistAttributes {
    id: string;
    name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Playlist extends Model<PlaylistAttributes>
        implements PlaylistAttributes {
        id!: string; //UID
        name!: string;
        static associate(models: any) {
            Playlist.belongsTo(models.user)
            Playlist.belongsToMany(models.song, {
                through: 'playlist_song'
            })
        }
    }
    Playlist.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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
    }, {
        sequelize,
        timestamps: false,
        modelName: 'playlist'
    });
    return Playlist;
}
