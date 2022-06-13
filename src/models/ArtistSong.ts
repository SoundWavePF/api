'use strict'

import { Model } from 'sequelize';


interface ArtistSongAttributes {
    idSong: number;
    idArtist: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class ArtistSong extends Model<ArtistSongAttributes>
        implements ArtistSongAttributes {
        idSong!: number;
        idArtist!: number;
    }
    ArtistSong.init({
        idSong: {
            type: DataTypes.INTEGER,
        },
        idArtist: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'ArtistSong'
    });
    return ArtistSong;
}
