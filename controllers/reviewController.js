const { Review, Restaurant, User } = require('../models');
const withAuth = require('../middleware/authMiddleware');

// 
exports.getDashboard = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: Restaurant }, { model: User, attributes: ['username'] }]
        });

        const searchHistory = [];

        res.render('dashboard', {
            user: req.session.user_id,
            reviews,
            searchHistory,
            loggedIn: req.session.logged_in
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

exports.addReview = async (req, res) => {
    try {
        const newReview = await Review.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.redirect(`/restaurants/${req.body.restaurantId}`);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};