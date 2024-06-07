const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User')(sequelize, Sequelize);
const Restaurant = require('./Restaurant')(sequelize, Sequelize);
const Review = require('./Review')(sequelize, Sequelize);


User.hasMany(Review, {foreignKey: 'user_id', onDelete: 'CASCADE'});
Review.belongsTo(User, {foreignKey: 'user_id'});
Restaurant.hasMany(Review, {foreignKey: 'restaurant_id', onDelete: 'CASCADE'});
Review.belongsTo(Restaurant, {foreignKey: 'restaurant_id'});

sequelize.sync();

module.exports = {
    User,
    Restaurant,
    Review,
    sequelize
};
