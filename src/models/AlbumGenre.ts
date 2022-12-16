'use strict'

import { Model } from 'sequelize';


interface AlbumGenreAttributes {
    idAlbum: number;
    idGenre: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class albumGenre extends Model<AlbumGenreAttributes>
        implements AlbumGenreAttributes {
        idAlbum!: number;
        idGenre!: number;
    }
    albumGenre.init({
        idAlbum: {
            type: DataTypes.INTEGER,
        },
        idGenre: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'albumGenre'
    });
    return albumGenre;
}
