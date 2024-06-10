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
router.get('/results/:locationId', restaurantController.showRestaurantResults);

module.exports = router;
