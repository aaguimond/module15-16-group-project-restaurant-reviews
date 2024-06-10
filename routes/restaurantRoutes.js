const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/search', (req, res) => {
    res.render('search');
});

router.post('/search', restaurantController.searchRestaurants);

router.get('/select', (req, res) => {
    const results = req.session.searchResults;
    res.render('select', { results });
});

router.post('/select', (req, res) => {
    console.log('POST request received at /restaurants/select');
    restaurantController.selectRestaurant(req, res);
});

module.exports = router;