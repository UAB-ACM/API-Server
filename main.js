//Switching to Strict JS
'use strict';                                                                   //Converts mistakes to errors

//Getting configuration
var config     = require('./config.json');                                      //Global config

//Libraries
var express    = require('express');                                            //Express Webapp Framework
var bodyParser = require('body-parser');                                        //Body Parsing Middleware

//Initalizing express server
var app = express();
    app.use(bodyParser.urlencoded({ extended: true }));                         //Configuring middleware
    app.post('/membership/signup.js', require('./routes/membership/signup.js'));//Route for ACM Membership signup


//Starting HTTP Server
app.listen(config.portNum, function () {                                        //Tell Express to listen on config port
    console.log('Listening for api requests...');                               //Logging sucessfully listening for requests on config port
});
