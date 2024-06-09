const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/search', (req, res) => res.render('search'));
router.post('/search', restaurantController.searchRestaurants);
router.post('/select', restaurantController.selectRestaurant)

module.exports = router;
