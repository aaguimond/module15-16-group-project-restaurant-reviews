const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');


module.exports = (app) => {
    // Set engine to display views as Handlebars
    app.engine('hbs', exphbs({
        // Engine will recognize hbs extension as handlebars files
        extname: 'hbs',
        // Our default view layout will be main.hbs
        defaultLayout: 'main',
        // Defining the directory our layouts are located at (main, etc)
        layoutsDir: __dirname + '/../views/layouts/',
        // Defining the directory our partials are located at (header, footer, etc)
        partialsDir: __dirname + '/../views/partials/'
    }));
    app.set('view engine', 'hbs');

    // Sets public folder as location to serve static files from
    app.use(express.static('public'));

    // Parses data from our forms
    app.use(bodyParser.urlencoded({ extended: true }));

    // Parses data from json objects
    app.use(express.json());
};