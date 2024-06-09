require('dotenv').config();

// Setting up Sequelize
module.exports = {
    // For local development
    development: {
        // Hard coded to reduce errors during development
        username: 'postgres',
        // variables from .env file
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        // local host
        host: '127.0.0.1',
        dialect: 'postgres',
    },
    // To be used when deploying with Render
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        // local host
        host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
};