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
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            restaurant_id: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: 'restaurants',
                    key: 'location_id',
                },
            },
            rating: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            review_text: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },   
        {
            sequelize,
            modelName: 'review',
            tablename: 'reviews',
            underscored: true,
            timestamps: true,
        },
    );


module.exports = Review;