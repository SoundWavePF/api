'use strict'

import {Model} from 'sequelize';


interface ArtistSongAttributes {
    idArtist: number;
    nameArtist: string;
    id_song_reference: number;
}

module.exports = (sequelize:any, DataTypes:any)=>{
    class ArtistSong extends Model<ArtistSongAttributes>
        implements ArtistSongAttributes{
            idArtist!: number;
            nameArtist!: string;
            id_song_reference!: number;
    }
    ArtistSong.init({
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
        modelName: 'ArtistSong'
    });
    return ArtistSong;
}
