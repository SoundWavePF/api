'use strict'

import { Model } from 'sequelize';


interface ArtistAlbumAttributes {
    idArtist: number;
    idAlbum: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class artistAlbum extends Model<ArtistAlbumAttributes>
        implements ArtistAlbumAttributes {
        idArtist!: number;
        idAlbum!: number;
    }
    artistAlbum.init({
        idArtist: {
            type: DataTypes.INTEGER,
        },
        idAlbum: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'artistAlbum'
    });
    return artistAlbum;
}
