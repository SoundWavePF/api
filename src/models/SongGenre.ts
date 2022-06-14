'use strict'

import { Model } from 'sequelize';


interface SongGenreAttributes {
    idSong: number;
    idGenre: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class songGenre extends Model<SongGenreAttributes>
        implements SongGenreAttributes {
        idSong!: number;
        idGenre!: number;
    }
    songGenre.init({
        idSong: {
            type: DataTypes.INTEGER,
        },
        idGenre: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'songGenre'
    });
    return songGenre;
}
