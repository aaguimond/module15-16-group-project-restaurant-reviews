const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Restaurant extends Model {}

const initRestaurant = (sequelize) => {
    Restaurant.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            locationId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
                validate: {
                len:[100],
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                isEmail: true,
                },
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    is: /^[0-9\+\-\s]+$/i,
                },
            },
            website: {
                type: DataTypes.STRING,
                allowNull: true,
                validate:{
                    isUrl: true,
                }
            },
            priceLevel: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            hours: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            photos: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
        },
        {
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'restaurant',
        }
    );
    return Restaurant;
};

module.exports = initRestaurant;