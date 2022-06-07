// import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
// import {User} from "./User";
//
// @Table({timestamps: true})
// export class Artist extends Model{
//
//     @Column({
//         type: DataType.INTEGER,
//         allowNull: false,
//         autoIncrement:true,
//         primaryKey:true
//     })
//     id: number | undefined
//
//     @Column({
//         type: DataType.STRING,
//         allowNull: false,
//         validate: {
//             is: {
//                 args: /^[A-Z a-z]+$/g,
//                 msg: 'Name contains invalid characters'
//             }
//         }
//     })
//     name: string | undefined
//
//     @Column({type: DataType.INTEGER})
//     plays: number | undefined
//
//     @Column({type: DataType.STRING, validate:{isUrl: true}})
//     url_avatar: string | undefined
//
//     @ForeignKey(()=>User)
//     @Column({
//         type: DataType.INTEGER
//     })
//     userId: number | undefined
//
//     @BelongsTo(()=>User)
//     @Column({
//         type: DataType.INTEGER
//     })
//     user: User | undefined
//
//
// }

'use strict'

import {Model} from 'sequelize';


interface ArtistAttributes {
    id: number;
    name: string;
    plays: number;
    url_avatar: string;
}

module.exports = (sequelize:any, DataTypes:any)=>{
    class Artist extends Model<ArtistAttributes>
        implements ArtistAttributes{
            id!: number;
            name!: string;
            plays!: number;
            url_avatar!: string;
            static associate(models: any){
                Artist.belongsTo(models.User)
            }
    }
    Artist.init({
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^[A-Z a-z]+$/g,
                    msg: 'Name contains invalid characters'
                }
            }
        },
        plays:{
            type: DataTypes.INTEGER
        },
        url_avatar:{
            type: DataTypes.STRING, validate:{isUrl: true}
        }
    }, {sequelize,
        modelName: 'Artist'
    });
    return Artist;
}
