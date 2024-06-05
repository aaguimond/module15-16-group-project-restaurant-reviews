const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/search', (req, res) => res.render('search'));
router.get('/results', restaurantController.searchRestaurants);

module.exports = router;
