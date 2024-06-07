const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'restaurant',
                key: 'id',
            },
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },   
    {
        sequelize,
        modelName: 'Review',
        tablename: 'reviews',
        timestamps: true,
    },
);

module.exports = Review;