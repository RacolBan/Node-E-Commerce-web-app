const sequelize = require('./config.model.js')
const DataTypes = require('sequelize');

const AccountModel = sequelize.define("accounts",
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [3, 20],
                    msg: "username require number of characters must be between 3 to 20 ."
                }
            }
        },
        hashPwd: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2,
            validate: {
                isIn: {
                    args: [[0, 1, 2]],
                    msg: "role require must be 0,1,2 "
                }
            }

        },
    },

    {
        timestamps: true,
    }

);

module.exports = AccountModel;
