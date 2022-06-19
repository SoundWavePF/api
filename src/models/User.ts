'use strict'

import { Model } from 'sequelize';


interface UserAttributes {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    rol: string;
    image_avatar: string;
    requested_artist: boolean;
    deactivated: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class user extends Model<UserAttributes>
        implements UserAttributes {
        id!: string;//UID
        name!: string;
        username!: string;
        email!: string;
        password!: string;
        rol!: string;
        image_avatar!: string;
        requested_artist!: boolean;
        deactivated!: boolean;
        static associate(models: any) {
            user.hasOne(models.artist)
            user.hasMany(models.playlist)
            user.belongsToMany(models.played, {
                through: 'playedSongs'
            })
            user.belongsToMany(models.song, {
                through: 'favorites'
            })
        }
    }
    user.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
        },
        rol: {
            type: DataTypes.ENUM('user', 'artist', 'admin'),
            defaultValue: 'user'
        },
        image_avatar: {
            type: DataTypes.STRING,
        },
        requested_artist: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        deactivated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'user'
    })
    return user;
}