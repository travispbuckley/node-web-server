const express = require('express');

var app = express();

// setup http route handlers. send http data/html page
// .get function takes in url path, and a function containing the request
// and the response. Request: headers, body, method to path, etc. 
// Response: the data being sent back: content, http status codes, etc.

// Middleware allows you to use express for different desired functionality.
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express.</h1>');
    res.send({
        name: 'Travis',
        likes: ['sports', 'coding']
    });
});

app.get('/about', (req, res) => {
    res.send('About Page');
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