const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Restaurant extends Model { }


Restaurant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        locationId:
        
        {

        },

        reviewId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'review',
                key: 'id',
            },
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        address: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
            len:[1,300],
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
            validate:{
               min: 1,
               max: 5,
            },
        },

        hours: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        photos: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
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

module.exports = Restaurant;
