const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const restaurantRoutes = require('./restaurantRoutes');
const reviewRoutes = require('./reviewRoutes');
const withAuth = require('../middleware/authMiddleware');

router.use('/auth', authRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/reviews', reviewRoutes);

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/dashboard', withAuth, (req, res) => {
    res.render('dashboard', { user: req.session.user, logged_in: req.session.logged_in });
});

router.get('/search', (req, res) => {
    res.render('search');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

module.exports = router;