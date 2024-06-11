const { Review, Restaurant, User } = require('../models');
const withAuth = require('../middleware/authMiddleware');

// 
const getDashboard = async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user_id, {
            attributes: ['username'],
            include: [
                {
                    model: Review,
                    include: [Restaurant]
                }
            ]
        });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const userData = user.get({ plain: true });

        const searchHistory = await Restaurant.findAll({
            where: {
                location_id: req.session.searchHistory
            }
        });

        const plainSearchHistory = searchHistory.map(r => r.get({ plain: true }));

        res.render('dashboard', {
            user: userData,
            reviews: userData.reviews,
            searchHistory: plainSearchHistory,
            loggedIn: req.session.logged_in
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

const addReview = async (req, res) => {
    try {
        const newReview = await Review.create({
            ...req.body,
            user_id: req.session.user_id,
            restaurant_id: req.body.restaurant_id
        });

        res.redirect(`/restaurants/${req.body.restaurant_id}`);
    } catch (err) {
        console.error('Error creating review:', err);
        res.status(500).json({ message: 'An error occurred while creating the review.' });
    }
};

module.exports = { getDashboard, addReview };