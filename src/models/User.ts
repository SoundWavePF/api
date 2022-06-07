'use strict'

import {Model} from 'sequelize';


interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    rol: string;
    url_avatar: string;
}

module.exports = (sequelize: any, DataTypes:any)=>{
    class User extends Model<UserAttributes>
        implements UserAttributes {
            id!: number;
            username!: string;
            email!: string;
            password!: string;
            rol!: string;
            url_avatar!: string;
            static associate(models: any){
                User.hasOne(models.Artist)
            }
    }
    User.init({
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm,
                    msg: 'Username contains invalid characters'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {msg: "Invalid email"}
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]{8,16}$/,
                msg: 'Invalid. It must not contain any whitespace, It must contain at least one uppercase, one lowercase and one numeric character. It must contain at least one special character. Length must be between 8 to 16 characters.'
            }
        },
        rol:{
            type: DataTypes.ENUM('visitant, registered, admin')
        },
        url_avatar: {
            type: DataTypes.STRING, validate: {isUrl: true}
        }
    }, {sequelize,
        modelName: 'User'
    })
    return User;
}