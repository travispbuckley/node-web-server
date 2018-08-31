const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// setup http route handlers. send http data/html page
// .get function takes in url path, and a function containing the request
// and the response. Request: headers, body, method to path, etc. 
// Response: the data being sent back: content, http status codes, etc.

// Middleware allows you to use express for different desired functionality.
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// app.use is how you setup middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    console.log(log);
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
    next();
});

app.use(express.static(__dirname + '/public'));

// sets a function up to be used wherever it is called within HBS files.
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express.</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello! Welcome'
    });
});

app.get('/about', (req, res) => {
    // .render() will set a view from the views 
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error handling request.'
    });
});

// binds application to port on machine. Can take a second parameter
// a function to do something once server is up.
app.listen(3000, () => {
    console.log('server is up on port 3000');
});