const sequelize = require('./config.model.js')
const DataTypes = require('sequelize');

const ProductModel = sequelize.define("products",
    {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 100],
                    msg: "name require number of characters must be between 3 to 100"
                }
            }
        },

        price: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.BLOB("medium"),
            allowNull: true
        }


    },

    {
        timestamps: true,
    }

);

module.exports = ProductModel;
