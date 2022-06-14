'use strict'

import { Model } from 'sequelize';


interface ArtistAttributes {
    id: string;
    dz_Id: number;
    name: string;
    image_small: string;
    image_medium: string;
    image_big: string;
    type: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Artist extends Model<ArtistAttributes>
        implements ArtistAttributes {
        id!: string; //uid
        dz_Id!: number;
        name!: string;
        image_small!: string; //cambiar url image
        image_medium!: string;
        image_big!: string;
        type!: string;
        static associate(models: any) {
            Artist.belongsTo(models.user)
            Artist.belongsToMany(models.album, {
                through: 'album_artist'
            })
            Artist.belongsToMany(models.song, {
                through: 'contributors'
            })
        }
    }
    Artist.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        dz_Id: {
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
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
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'artist'
    });
    return Artist;
}
