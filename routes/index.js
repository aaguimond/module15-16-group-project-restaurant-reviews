const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const restaurantRoutes = require('./restaurantRoutes');
const reviewRoutes = require('./reviewRoutes');

router.use('/auth', authRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/reviews', reviewRoutes);

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
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