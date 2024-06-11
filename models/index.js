const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User');
const Restaurant = require('./Restaurant');
const Review = require('./Review');

User.hasMany(Review, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'user_id' });

Restaurant.hasMany(Review, { foreignKey: 'restaurant_id', onDelete: 'CASCADE' });
Review.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

module.exports = {
    User,
    Restaurant,
    Review,
    sequelize,
};