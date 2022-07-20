const sequelize = require('./config.model.js')
const DataTypes = require('sequelize');

const ManufactureModel = sequelize.define("manufactures",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [3, 25],
                    msg: "manufacturer require number of characters must be between 3 to 25"
                }
            }
        },



    },

    {
        timestamps: true,
    }

);

module.exports = ManufactureModel;
