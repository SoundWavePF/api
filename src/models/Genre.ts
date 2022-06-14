'use strict'

import { Model } from 'sequelize';

interface GenreAttributes {
    id: string;
    dz_Id: number;
    name: string;
    image_small: string;
    image_medium: string;
    image_big: string;
    type: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Genre extends Model<GenreAttributes>
        implements GenreAttributes {
        id!: string; //uid
        dz_Id!: number;
        name!: string;
        image_small!: string;
        image_medium!: string;
        image_big!: string;
        type!: string
        static associate(models: any) {
            Genre.belongsToMany(models.album, {
                through: 'album_genre'
            })
            Genre.hasMany(models.song)
        }
    }
    Genre.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        dz_Id: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
        },
        image_small: {
            type: DataTypes.STRING,
        },
        image_medium: {
            type: DataTypes.STRING,
        },
        image_big: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'genre'
    });
    return Genre;
}
