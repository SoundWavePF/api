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
            defaultValue: 'https://res.cloudinary.com/dbi1xhzps/image/upload/v1656554222/___u3gyvm.png'
        },
        image_medium: {
            type: DataTypes.STRING,
            defaultValue: 'https://res.cloudinary.com/dbi1xhzps/image/upload/v1656554222/___u3gyvm.png'
        },
        image_big: {
            type: DataTypes.STRING,
            defaultValue: 'https://res.cloudinary.com/dbi1xhzps/image/upload/v1656554222/___u3gyvm.png'
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
