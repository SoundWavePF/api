'use strict'

import { Model } from 'sequelize';


interface UserAttributes {
    id: string;
    name: string;
    username: string;
    email: string;
    rol: string;
    image_avatar: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class user extends Model<UserAttributes>
        implements UserAttributes {
        id!: string;//UID
        name!: string;
        username!: string;
        email!: string;
        rol!: string;
        image_avatar!: string; //image
        static associate(models: any) {
            user.hasOne(models.artist)
            user.hasMany(models.playlist)
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
        rol: {
            type: DataTypes.ENUM('user', 'artist', 'admin'),
            defaultValue: 'user'
        },
        image_avatar: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'user'
    })
    return user;
}