'use strict'

import { Model } from 'sequelize';


interface AlbumAttributes {
    id: string;
    dz_Id: number;
    name: string;
    release_date: string;
    image_small: string;
    image_medium: string;
    image_big: string;
    type: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class album extends Model<AlbumAttributes>
        implements AlbumAttributes {
        id!: string;
        dz_Id!: number;
        name!: string;
        image_small!: string;
        image_medium!: string;
        image_big!: string;
        release_date!: string;
        type!: string;
        static associate(models: any) {
            album.belongsToMany(models.artist, {
                through: 'album_artist'
            })
            album.belongsToMany(models.genre, {
                through: 'album_genre'
            })
            album.hasMany(models.song)
        }
    }
    album.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        dz_Id: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        release_date: {
            type: DataTypes.STRING
        },
        image_small: {
            type: DataTypes.STRING
        },
        image_medium: {
            type: DataTypes.STRING
        },
        image_big: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'album'
    });
    return album;
}
