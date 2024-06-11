const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Restaurant extends Model {}

    Restaurant.init(
        {
            location_id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
                field: 'location_id', // Explicitly set the field name
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
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
                validate: {
                    isUrl: true,
                }
            },
            priceLevel: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'price_level' // Explicitly set the field name
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
            underscored: true, // Ensure snake_case in the database
            modelName: 'restaurant',
            tableName: 'restaurants', // Ensure tableName matches your database schema
        }
    );

module.exports = Restaurant;
