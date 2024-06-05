const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/dashboard', reviewController.getDashboard);
router.post('/reviews', reviewController.addReview);

module.exports = router;
