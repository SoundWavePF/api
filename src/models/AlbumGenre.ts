'use strict'

import {Model} from 'sequelize';


interface AlbumGenreAttributes {
    idAlbum: number;
    nameAlbum: string;
    idGenre: number;
}

module.exports = (sequelize:any, DataTypes:any)=>{
    class AlbumGenre extends Model<AlbumGenreAttributes>
        implements AlbumGenreAttributes{
            idAlbum!: number;
            nameAlbum!: string;
            idGenre!: number;
    }
    AlbumGenre.init({
        idAlbum:{
            type: DataTypes.INTEGER,
        },
        nameAlbum:{
            type: DataTypes.STRING,
        },
        idGenre:{
            type: DataTypes.INTEGER,
        },
    }, {sequelize,
        timestamps: false,
        modelName: 'AlbumGenre'
    });
    return AlbumGenre;
}
