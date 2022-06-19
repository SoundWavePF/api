'use strict'

import { Model } from 'sequelize';


interface playedAttributes {
    songId: string;
    date_played: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class played extends Model<playedAttributes>
        implements playedAttributes {
        songId!: string;
        date_played!: string;
        static associate(models: any) {
            played.belongsToMany(models.user, {
                through: 'playedSongs'
            });
        }
    }
    played.init({
        songId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        date_played: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'played'
    })
    return played;
}