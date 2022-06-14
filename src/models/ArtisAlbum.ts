'use strict'

import { Model } from 'sequelize';


interface ArtistAlbumAttributes {
    idArtist: number;
    idAlbum: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class ArtistAlbum extends Model<ArtistAlbumAttributes>
        implements ArtistAlbumAttributes {
        idArtist!: number;
        idAlbum!: number;
    }
    ArtistAlbum.init({
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
    return ArtistAlbum;
}
