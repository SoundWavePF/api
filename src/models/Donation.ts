'use strict'

import { Model } from 'sequelize';

interface DonationsAttributes {
    id: string;
    amount: string;
    status: string;
    type: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class donation extends Model<DonationsAttributes>
        implements DonationsAttributes {
        id!: string;
        amount!: string;
        status!: string;
        type!: string;
        static associate(models: any) {
            donation.belongsTo(models.artist)
            donation.belongsTo(models.user)
        }
    }
    donation.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        amount: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending'
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: 'donation'
        },
    }, {
        sequelize,
        modelName: 'donation'
    });
    return donation;
}
