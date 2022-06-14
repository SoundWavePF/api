'use strict'

import { Model } from 'sequelize';


interface PlaylistAttributes {
    id: string;
    name: string;
    image_playlist: string;
    type: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class playlist extends Model<PlaylistAttributes>
        implements PlaylistAttributes {
        id!: string; //UID
        name!: string;
        image_playlist!: string;
        type!: string;
        static associate(models: any) {
            playlist.belongsTo(models.user)
            playlist.belongsToMany(models.song, {
                through: 'playlist_song'
            })
        }
    }
    playlist.init({
        id: {
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
        },
        type:{
            type: DataTypes.STRING,
            defaultValue: 'playlist'
        }
    }, {sequelize,
        timestamps: false,
        modelName: 'playlist'
    });
    return playlist;
}
