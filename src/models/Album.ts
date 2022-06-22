'use strict'

import { Model } from 'sequelize';


interface AlbumAttributes {
    id: string;
    dz_Id: number;
    name: string;
    artist: string;
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
        artist!: string;
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
        artist: {
            type: DataTypes.STRING
        },
        release_date: {
            type: DataTypes.STRING
        },
        image_small: {
            type: DataTypes.STRING,
            defaultValue: 'https://t3.ftcdn.net/jpg/02/35/30/46/360_F_235304699_bRPtGREh0e5AmIDsckx5UjiWKAZdB2oc.jpg'
        },
        image_medium: {
            type: DataTypes.STRING,
            defaultValue: 'https://t3.ftcdn.net/jpg/02/35/30/46/360_F_235304699_bRPtGREh0e5AmIDsckx5UjiWKAZdB2oc.jpg'
        },
        image_big: {
            type: DataTypes.STRING,
            defaultValue: 'https://t3.ftcdn.net/jpg/02/35/30/46/360_F_235304699_bRPtGREh0e5AmIDsckx5UjiWKAZdB2oc.jpg'
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: 'album'
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'album'
    });
    return album;
}
