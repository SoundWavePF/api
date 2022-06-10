'use strict'

import {Model} from 'sequelize';


interface ArtistAttributes {
    idArtist: number;
    nameArtist: string;
    id_song_reference: string;
}

module.exports = (sequelize:any, DataTypes:any)=>{
    class ArtistId extends Model<ArtistAttributes>
        implements ArtistAttributes{
            idArtist!: number;
            nameArtist!: string;
            id_song_reference!: string;
    }
    ArtistId.init({
        idArtist:{
            type: DataTypes.INTEGER,
        },
        nameArtist:{
            type: DataTypes.STRING,
        },
        id_song_reference:{
            type: DataTypes.INTEGER,
        },
    }, {sequelize,
        timestamps: false,
        modelName: 'ArtistId'
    });
    return ArtistId;
}
