const express = require('express');
const router = express.Router();
const { searchRestaurants, selectRestaurant, showRestaurantResults, fetchDetailsAndRender } = require('../controllers/restaurantController');
const searchHistoryMiddleware = require('../middleware/searchHistoryMiddleware');

router.get('/search', (req, res) => {
    res.render('search');
});
router.post('/search', searchRestaurants);

router.get('/select', (req, res) => {
    const results = req.session.searchResults;
    res.render('select', { results });
});
router.post('/select', selectRestaurant);

router.get('/results/:location_id', searchHistoryMiddleware, showRestaurantResults);

router.get('/:location_id', searchHistoryMiddleware, fetchDetailsAndRender);

module.exports = router;
