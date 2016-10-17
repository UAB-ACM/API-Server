/* Switching to Strict Mode */
'use strict';                                                                   //Converts mistakes to errors

/* Configuration */
var config = require('../../config.json');

/* Libraries */
var stripe     = require('stripe')(config.stripe.key);                          //Stripe Payment Library
var nodemailer = require('nodemailer');                                         //Mailer Library
var mysql      = require('mysql');                                              //MySQL Library

/* Mail Sender Setup */
var transportString = `smtps://${config.email.username}%40${config.email.domain}:${config.email.password}@${config.email.smtpServer}`
var transporter = nodemailer.createTransport(transportString);                  //Open SMTP Connection


/* MySQL Connection Setup */
var db = mysql.createConnection(config.database);
    db.connect();

/* Exporting route */
module.exports = function (req, res) {                                          //Export the function that is used to handle the web request
  console.log(`New Membership: ${req.body.blazerid}`);                            //Logging out to server

  stripe.charges.create({                                                         //Create a stripe charge
    amount: 1000,                                                                   //Amount is 1000 cents ($10.00)
    currency: 'usd',                                                                //The currency is US Dollar
    source: req.body.token.id,                                                      //Getting credit card token from request
    description: '1 Year Membership charge for ' + req.body.blazerid,               //Setting the description for the charge
    receipt_email: req.body.email,                                                  //Where to send the charge receipt
    metadata: {'order_id': req.body.blazerid}                                       //Extra metadata for tracking
  },

  function(err, charge){                                                          //Stripe charge returned
    if(err){
      console.error(`Signup Failed: ${err}`);                                         //Logging out to server if error
      res.status(500).send(`Signup Failed: ${err}`);                                  //If error send error back to client
      return;                                                                         //Don't continue
    }

    res.send('Signup Success!');                                                  //Sending success back to client

    var today = new Date();
    var membershipStart = today.getUTCFullYear()+'-'+(today.getUTCMonth() + 1)+'-'+today.getUTCDate();
    var membershipEnd = (today.getUTCFullYear() + 1)+'-'+(today.getUTCMonth() + 1)+'-'+today.getUTCDate();

    var query = `INSERT INTO membership
                       SET name = '${req.body.name}',
                           blazer_id = '${req.body.blazerid}',
                           email = '${req.body.email}',
                           membership_start = '${membershipStart}',
                           membership_end = '${membershipEnd}';`;

    db.query(query, function(err, rows, fields) {                                 //Registering User with Database
      if (err) throw err;
      console.log('Registered ${req.body.blazerid} with database');
    });

    var mailOptions = {                                                           //Mail Config
        from: '"ACM Server" <uabacm@gmail.com>',                                    //Sender Address
        to: 'acm@cis.uab.edu',                                                      //Receiver Address
        subject: 'New Membership!',                                                 //Message Subject
        text: `Name: ${req.body.name} \n BlazerID: ${req.body.blazerid} \n Email: ${req.body.email}`,//Message Body
    };

    transporter.sendMail(mailOptions, function(error, info){                      //Send the email
        if(error) return console.error(error);                                      //Logging out to server if error
        console.log('Message sent: ' + info.response);                              //Logging out to server
    });

  });
};
