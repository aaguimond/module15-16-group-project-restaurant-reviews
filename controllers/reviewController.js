const { Review, Restaurant, User } = require('../models');
const withAuth = require('../middleware/authMiddleware');

// 
const getDashboard = async (req, res) => {
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

const addReview = async (req, res) => {
    try {
        console.log('Session user_id:', req.session.user_id);
        console.log('Request body:', req.body);

        const newReview = await Review.create({
            ...req.body,
            user_id: req.session.user_id,
            restaurant_id: req.body.restaurant_id
        });

        console.log('New review created:', newReview);

        res.redirect(`/restaurants/${req.body.restaurant_id}`);
    } catch (err) {
        console.error('Error creating review:', err);
        res.status(500).json({ message: 'An error occurred while creating the review.' });
    }
};

module.exports = { getDashboard, addReview };