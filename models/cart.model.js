const sequelize = require('./config.model.js');
const DataTypes = require('sequelize');

const CartModel = sequelize.define("carts",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantityProduct: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        timestamps: true
    }
);
module.exports = CartModel