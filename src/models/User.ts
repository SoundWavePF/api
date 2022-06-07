import { Table, Column, Model, DataType, ForeignKey} from 'sequelize-typescript';
import {Artist} from "./Artist";

@Table({timestamps: false})
export class User extends Model {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    })
    id: number | undefined

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm,
                msg: 'Username contains invalid characters'
            }
        }
    })
    username: string | undefined

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isEmail: {msg: "Invalid email"}
        }
    })
    email: string | undefined

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            is: /^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]{8,16}$/,
            msg: 'Invalid. It must not contain any whitespace, It must contain at least one uppercase, one lowercase and one numeric character. It must contain at least one special character. Length must be between 8 to 16 characters.'
        }
    })
    password: string | undefined

    @Column({type: DataType.INTEGER})
    listeningTime: number | undefined

    @Column({type: DataType.ENUM('visitant, registered, admin')})
    rol: string | undefined

    @Column({type: DataType.STRING, validate: {isUrl: true}})
    url_avatar: string | undefined

    @ForeignKey(() => Artist)
    @Column({
        type: DataType.INTEGER
    })
    artistId: number | undefined
}