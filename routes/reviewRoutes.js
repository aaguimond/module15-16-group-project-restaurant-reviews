const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const withAuth = require('../middleware/authMiddleware');

router.get('/dashboard', withAuth, reviewController.getDashboard);
router.post('/reviews', withAuth, reviewController.addReview);

module.exports = router;