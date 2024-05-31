const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const endpoint = 'https://api.tripadvisor.com/api/path';

const testTripAdvisorAPI = async () => {
    try {
        const response = await axios.get(endpoint, {
            params: {
                query: 'restaurant_name_or_location', // Replace with your search query
                // Add other required parameters
            },
            headers: {
                'Authorization': `Bearer ${apiKey}` // Assuming the API uses Bearer token
                // Add other required headers
            }
        });

        console.log('API Response:', response.data);
    } catch (error) {
        console.error('Error fetching data from TripAdvisor API:', error);
    }
};

testTripAdvisorAPI();
