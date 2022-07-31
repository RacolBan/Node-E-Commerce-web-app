const sequelize = require('./config.model.js');
const DataTypes = require('sequelize');

const UserModel = sequelize.define("user",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 10],
                    msg: "firstName require number of characters must be between 3 to 10"
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 10],
                    msg: "lastName require number of characters must be between 3 to 10"
                }
            }
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "invalid email"
                },

            }
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        address: {
            type: DataTypes.STRING,
        },


    },
    {
        timestamps: true,
    },
);

module.exports = UserModel;


