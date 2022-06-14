'use strict'

import { Model } from 'sequelize';


interface SongGenreAttributes {
    idSong: number;
    idGenre: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class SongGenre extends Model<SongGenreAttributes>
        implements SongGenreAttributes {
        idSong!: number;
        idGenre!: number;
    }
    SongGenre.init({
        idSong: {
            type: DataTypes.INTEGER,
        },
        idGenre: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'SongGenre'
    });
    return SongGenre;
}
