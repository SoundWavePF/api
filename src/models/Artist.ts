'use strict'

import { Model } from 'sequelize';


interface ArtistAttributes {
    id: string;
    dz_Id: number;
    stripe_Id: string;
    name: string;
    description: string;
    image_small: string;
    image_medium: string;
    image_big: string;
    type: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class artist extends Model<ArtistAttributes>
        implements ArtistAttributes {
        id!: string; //uid
        dz_Id!: number;
        stripe_Id!: string;
        name!: string;
        description!: string;
        image_small!: string;
        image_medium!: string;
        image_big!: string;
        type!: string;
        static associate(models: any) {
            artist.belongsTo(models.user)
            artist.belongsToMany(models.album, {
                through: 'album_artist'
            })
            artist.belongsToMany(models.song, {
                through: 'contributors'
            })
            artist.hasMany(models.donation)
        }
    }
    artist.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        dz_Id: {
            type: DataTypes.INTEGER,
        },
        stripe_Id: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        image_small: {
            type: DataTypes.STRING,
            defaultValue: 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'
        },
        image_medium: {
            type: DataTypes.STRING,
            defaultValue: 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'
        },
        image_big: {
            type: DataTypes.STRING,
            defaultValue: 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'
        },
        type: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'artist'
    });
    return artist;
}
