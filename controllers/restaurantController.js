const { Restaurant } = require('../models/Restaurant');
const axios = require('axios');
require('dotenv').config();

// Handles form submission and TripAdvisor API calls
exports.searchRestaurants = async (req, res) => {
    // Gathering user input data
    const { name, address } = req.body;
    // Declaring api key from our env file
    const apiKey = process.env.API_KEY;
    // Endpoint for our first API call to retrieve TripAdvisor's 'location_id' for the restaurant
    // Tertiary function: if address is included, our endpoint is the first link. If address is absent, our endpoint is the second link
    const endpoint1 = address
    ? `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&searchQuery=${encodeURIComponent(name)}&category=restaurants&address=${encodeURIComponent(address)}&language=en`
    : `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&searchQuery=${encodeURIComponent(name)}&category=restaurants&language=en`;

    try {
        // First API call to get location ID
        const search1Response = await axios.get(endpoint1);
        // Declaring the data from TripAdvisor as a variable
        const search1Results = search1Response.data.data
        // If we get more than one result returned,
        if (search1Results.length > 1) {
            // We take the top five results and render them to the select page
            const top5Results = search1Results.slice(0, 5);
            res.json({ redirect: '/restaurants/select', results: top5Results });
        // If we get ONLY one result,
        } else if (search1Results.legth === 1) {
            // We go right ahead and pass that locationId to the second and third API calls and render them to the details page
            await fetchDetailsAndRender(results[0].location_id, res);
        // If NO results are returned, we display an error message on the search page
        } else {
            res.json({ redirect: '/', message: 'No results found. Please try another search.' });
        }
    // Error catching for the first API call
    } catch (err) {
        console.error('Error fetching data from TripAdvisor API:', err);
        res.status(500).json({ message: 'An error occurred while fetching data from the TripAdvisor API.' });
    }
};

// When there are multiple results that are returned from a search, we redirect them to the select page,
exports.selectRestaurant = async (req, res) => {
    const { locationId } =  req.body;
    // where once they select which result they'd like details on,
    try {
        // We make the second and third API calls and render the results to the page
        await fetchDetailsAndRender(locationId, res);
    } catch (err) {
        console.error('Error fetching data from TripAdvisor API:', err);
        res.status(500).json({ message: 'An error occurred while fetching data from the TripAdvisor API.' });
    }
};

// Second and third API calls to TripAdvisor to get restaurant pictures and details
const fetchDetailsAndRender = async (locationId, res) => {
    const apiKey = process.env.API_KEY;

    // Second API call endpoint to get photos
    const photosEndpoint = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?key=${apiKey}&language=en&limit=3`;

    // Third API call endpoint to get details about restaurant
    const detailsEndpoint = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?key=${apiKey}&language=en&currency=USD`;

    try {
        // Declaring the response data
        const photosResponse = await axios.get(photosEndpoint);
        // Declaring the response data
        const detailsResponse = await axios.get(detailsEndpoint);

        // Creating object with the photos
        const photos = photosResponse.data.data;
        // Creating object with the photos
        const details = detailsResponse.data;

        const restaurant = await Restaurant.findOrCreate({
          where: { locationId: locationId },
          defaults: { name: details.name }
        });

        // Rendering our results to our handlebars view
        res.render('results', {
            name: details.name,
            address: details.adress_obj.adress_string,
            email: details.email,
            phone: details.phone,
            website: details.website,
            priceLevel: details.price_level,
            hours: details.hours.weekday_text,
            photos: photos.map(photo => photo.images.medium.url),
            restaurantId: locationId
        });
    } catch (err) {
        console.error('Error fetching details from TripAdvisor API:', err);
        res.status(500).json({ message: 'An error occurred while fetching restaurant details from the TripAdvisor API.' });
    }
};
  