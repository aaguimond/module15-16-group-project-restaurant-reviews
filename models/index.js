const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const initUser = require('./User');
const initRestaurant = require('./Restaurant');
const initReview = require('./Review');

const User = initUser(sequelize);
const Restaurant = initRestaurant(sequelize);
const Review = initReview(sequelize)

User.hasMany(Review, {foreignKey: 'user_id', onDelete: 'CASCADE'});
Review.belongsTo(User, {foreignKey: 'user_id'});
Restaurant.hasMany(Review, {foreignKey: 'restaurant_id', onDelete: 'CASCADE'});
Review.belongsTo(Restaurant, {foreignKey: 'restaurant_id'});

async function syncModels() {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.')
}

syncModels();

module.exports = {
    User,
    Restaurant,
    Review,
    sequelize
};
