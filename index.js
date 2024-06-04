const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Importing middleware
require('./middleware/setupMiddleware')(app);

// Displays search form
app.get('/', (req, res) => {
    res.render('search');
});

// Handles form submission and TripAdvisor API calls
app.post('/search', async (req, res) => {
    // Gathering user input data
    const { name, address } = req.body;
    // Declaring api key from our env file
    const apiKey = process.env.API_KEY;
    // Endpoint for our first API call to retrieve TripAdvisor's 'location_id' for the restaurant
    const endpoint1 = `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&seachQuery=${encodeURIComponent(name)}&category=restaurants&address=${encodeURIComponent(address)}&language=en`;

    try {
        // First API call to get location ID
        const search1Response = await axios.get(endpoint1);
        // Declaring the location_id from TripAdvisor as a variable
        const locationId = search1Response.data.data[0].location_id;

        // Second API call to get photos
        const photosEndpoint = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?key=${apiKey}&language=en&limit=3`;
        // Declaring the response data
        const photosResponse = await axios.get(photosEndpoint);
        // Creating object with the photos
        const photos = photosResponse.data.data;

        // Third API call to get details about restaurant
        const detailsEndpoint = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?key=${apiKey}&language=en&currency=USD`;
        // Declaring the response data
        const detailsResponse = await axios.get(detailsEndpoint);
        // Creating object with the photos
        const details = detailsResponse.data;

        // Rendering our results to our handlebars view
        res.render('results', {
            name: details.name,
            address: details.adress_obj.adress_string,
            email: details.email,
            phone: details.phone,
            website: details.website,
            priceLevel: details.price_level,
            hours: details.hours.weekday_text,
            photos: photos.map(photo => photo.images.medium.url)
        });
    // Error catching
    } catch (error) {
        console.error('Error fetching data from TripAdvisor API:', error);
        res.status(500).json({ message: 'An error occurred while fetching data from the TripAdvisor API.' })
    }
});

// Declaring port and listening once initiated
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});
