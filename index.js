// Main controller. Linking application logic
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/database');
require('dotenv').config();
const routes = require('./routes');
const setupMiddleware = require('./middleware/setupMiddleware');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Linking to middleware
setupMiddleware(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting up session attributes
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({ db: sequelize }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        // 5 hours (hours, minutes, seconds, milliseconds)
        maxAge: 5 * 60 * 60 * 1000
    }
}));

// Linking routes and error handler
app.use(routes);
app.use(errorHandler);

// Declaring server port from .env file
const PORT = process.env.PORT || 3000;

// Logging to the console that the server is functioning
app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});