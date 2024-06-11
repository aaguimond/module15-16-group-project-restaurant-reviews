const express = require('express');
const router = express.Router();
const { addReview }= require('../controllers/reviewController');
const withAuth = require('../middleware/authMiddleware');

router.post('/restaurants/:location_id', withAuth, addReview);

module.exports = router;