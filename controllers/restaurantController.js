const router = require('express').Router();
const { Restaurant } = require('./models/Restaurant.js');

router.get('/restaurants/:id', async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll(); // Query the database for all restaurants
      res.json(restaurants);// Return the fetched restaurants as JSON
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' }); // Handle errors
    }
  });
  