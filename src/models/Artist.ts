import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import {User} from "./User";

@Table({timestamps: false})
export class Artist extends Model{

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey:true
    })
    id: number | undefined

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^[A-Z a-z]+$/g,
                msg: 'Name contains invalid characters'
            }
        }
    })
    name: string | undefined

    @Column({type: DataType.INTEGER})
    plays: number | undefined

    @Column({type: DataType.STRING, validate:{isUrl: true}})
    url_avatar: string | undefined

    @ForeignKey(()=>User)
    @Column({
        type: DataType.INTEGER
    })
    userId: number | undefined
}