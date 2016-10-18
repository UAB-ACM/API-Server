/* Switching to Strict Mode */
'use strict';                                                                   //Converts mistakes to errors

/* Configuration */
var config     = require('./config.json');                                      //Global config

/* Libraries */
var express    = require('express');                                            //Express Webapp Framework
var bodyParser = require('body-parser');                                        //Body Parsing Middleware

/* Initalizing express server */
var app = express();                                                            //New express server
    app.use(bodyParser.urlencoded({ extended: true }));                           //Configuring middleware
    app.post('/contact.js', require('./routes/contact/contact.js'));              //Route for Content form
    app.post('/membership/signup.js', require('./routes/membership/signup.js'));  //Route for ACM Membership signup
    app.get('/getMembership.js', require('./routes/membership/getMembership.js'));//Route for getting membership status

/* Starting HTTP Server */
app.listen(config.portNum, function () {                                        //Tell Express to listen on config port
    console.log('Listening for api requests...');                                 //Logging sucessfully listening for requests on config port
});
