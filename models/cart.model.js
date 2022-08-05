const sequelize = require('./config.model.js');
const DataTypes = require('sequelize');

const CartModel = sequelize.define("carts",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }

    },
    {
        timestamps: true
    }
);
module.exports = CartModel