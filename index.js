// Main controller. Linking application logic
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/database');
require('dotenv').config();
const routes = require('./routes');
const setupMiddleware = require('./middleware/setupMiddleware');
const errorHandler = require('./middleware/errorHandler');
const searchHistoryMiddleware = require('./middleware/searchHistoryMiddleware');

const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const Review = require('./models/Review');

const app = express();

// Linking to middleware
setupMiddleware(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionStore = new SequelizeStore({
    db: sequelize,
});

// Setting up session attributes
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        // 5 hours (hours, minutes, seconds, milliseconds)
        maxAge: 5 * 60 * 60 * 1000
    }
}));

app.use(searchHistoryMiddleware);

app.use((req, res, next) => {
    res.locals.logged_in = req.session.logged_in;
    res.locals.user = req.session.user;
    next();
});

// Linking routes and error handler
app.use(routes);
app.use(errorHandler);

// Declaring server port from .env file
const PORT = process.env.PORT || 3000;

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Use { force: true } for development, { alter: true } for production

        // Sync session store
        await sessionStore.sync();

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is now running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Unable to sync database:', err);
    }
};

syncDatabase();