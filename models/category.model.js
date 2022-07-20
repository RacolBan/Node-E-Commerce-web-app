const sequelize = require('./config.model.js')
const DataTypes = require('sequelize');

const CategoryModel = sequelize.define("categories",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [3, 100],
                    msg: "name Category number of character must be between 3 to 100"
                }
            }
        },



    },

    {
        timestamps: true,
    }

);

module.exports = CategoryModel;
