const { Restaurant, Review, User } = require('../models');
const axios = require('axios');
require('dotenv').config();

// Handles form submission and TripAdvisor API calls
const searchRestaurants = async (req, res) => {
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
            const top10Results = search1Results.slice(0, 10);
            req.session.searchResults = top10Results;
            console.log('Search results have been set in session -----', req.session.searchResults);
            res.json({ redirect: '/restaurants/select' });
        // If we get ONLY one result,
        } else if (search1Results.length === 1) {
            const location_id = search1Results[0].location_id;
            console.log(location_id)
            req.session.save(() => {
                res.json({ redirect: `/restaurants/results/${location_id}` });
            })
            // We go right ahead and pass that location_id to the second and third API calls and render them to the details page
            // await fetchDetailsAndRender(search1Results[0].location_id, res);
        // If NO results are returned, we display an error message on the search page
        } else {
            res.json({ message: 'No results found. Please try another search.' });
        }
    // Error catching for the first API call
    } catch (err) {
        console.error('Error fetching data from TripAdvisor API:', err);
        res.status(500).json({ message: 'An error occurred while fetching data from the TripAdvisor API.' });
    }
};

// When there are multiple results that are returned from a search, we redirect them to the select page,
const selectRestaurant = async (req, res) => {
    const { location_id } = req.params;
    console.log('Received location_id:', location_id);
    // where once they select which result they'd like details on,
    try {
        // We make the second and third API calls and render the results to the page
        await fetchDetailsAndRender(location_id, res);
    } catch (err) {
        console.error('Error fetching data from TripAdvisor API:', err);
        res.status(500).json({ message: 'An error occurred while fetching data from the TripAdvisor API.' });
    }
};

// When there are multiple results that are returned from a search, we redirect them to the select page,
const showRestaurantResults = async (req, res) => {
    const { location_id } = req.params;
    console.log('Received location_id:', location_id);
    // where once they select which result they'd like details on,
    try {
        // We make the second and third API calls and render the results to the page
        res.redirect(`/restaurants/${location_id}`)
    } catch (err) {
        console.error('Error fetching data from TripAdvisor API:', err);
        res.status(500).json({ message: 'An error occurred while fetching data from the TripAdvisor API.' });
    }
};

// Second and third API calls to TripAdvisor to get restaurant pictures and details
const fetchDetailsAndRender = async (req, res) => {
    const apiKey = process.env.API_KEY;
    const location_id = req.params.location_id;
    console.log('Location_id', location_id);
    const photosEndpoint = `https://api.content.tripadvisor.com/api/v1/location/${location_id}/photos?key=${apiKey}&language=en&limit=3`;
    const detailsEndpoint = `https://api.content.tripadvisor.com/api/v1/location/${location_id}/details?key=${apiKey}&language=en&currency=USD`;

    try {
        console.log('Problematic URL:', photosEndpoint)
        const photosResponse = await axios.get(photosEndpoint);
        const detailsResponse = await axios.get(detailsEndpoint);

        const photos = photosResponse.data.data;
        const details = detailsResponse.data;

        const hours = details.hours ? details.hours.weekday_text.join(', ') : null;

        const [restaurant, created] = await Restaurant.findOrCreate({
            where: { location_id: location_id },
            defaults: {
                location_id: location_id, // Ensure location_id is set correctly
                name: details.name,
                address: details.address_obj.address_string,
                email: details.email,
                phone: details.phone,
                website: details.website,
                priceLevel: details.price_level, // Ensure priceLevel is handled properly
                hours: hours, // Convert hours to string
                photos: photos.map(photo => photo.images.medium.url),
            }
        });

        console.log('Restaurant saved or found:', restaurant);

        const reviewData = await Review.findAll({
            where: {
                restaurant_id: restaurant.location_id
            },
            include: User
        });

        const reviews = reviewData.map((review) => review.get({ plain: true }));
        console.log(reviews)
        res.render('results', {
            name: restaurant.name,
            address: restaurant.address,
            email: restaurant.email,
            phone: restaurant.phone,
            website: restaurant.website,
            priceLevel: restaurant.priceLevel,
            hours: restaurant.hours,
            photos: restaurant.photos,
            restaurant_id: restaurant.location_id,
            reviews,
        });
    } catch (err) {
        console.error('Error fetching details from TripAdvisor API:', err);
        res.status(500).json({ message: 'An error occurred while fetching restaurant details from the TripAdvisor API.' });
    }
};

module.exports = { searchRestaurants, selectRestaurant, showRestaurantResults, fetchDetailsAndRender };