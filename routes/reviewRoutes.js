const express = require('express');
const router = express.Router();
const { getDashboard, addReview }= require('../controllers/reviewController');
const withAuth = require('../middleware/authMiddleware');

router.get('/dashboard', withAuth, getDashboard);
router.post('/restaurants/:location_id', withAuth, addReview);

module.exports = router;