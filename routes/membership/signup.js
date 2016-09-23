//Switching to Strict JS
'use strict';                                                                   //Converts mistakes to errors

var config = require('../../config.json');                               //Config

var stripe     = require('stripe')(config.stripe.key);                                 //Stripe Payment Library
var nodemailer = require('nodemailer');                                         //Mailer Library

var transportString = `smtps://${config.email.username}%40${config.email.domain}:${config.email.password}@${config.email.smtpServer}`
var transporter = nodemailer.createTransport(transportString);                  //Open SMTP Connection


//Exporting route
module.exports = function (req, res) {                                          //Export the function that is used to handle the web request
  console.log(req.body.name);
  console.log(req.body.blazerid);
  console.log(req.body.email);
  console.log(req.body.token);

  stripe.charges.create({                                                       //Create a stripe charge
    amount: 1000,                                                               //Amount is 1000 cents ($10.00)
    currency: 'usd',                                                            //The currency is US Dollar
    source: req.body.token.id,                                                  //Getting credit card token from request
    description: '1 Year Membership charge for ' + req.body.blazerid,           //Setting the description for the charge
    receipt_email: req.body.email,                                              //Where to send the charge receipt
    metadata: {'order_id': req.body.blazerid}                                   //Extra metadata for tracking
  },

  function(err, charge){                                                        //Charge callback function
    var data = {                                                                //Data object to send back to client
      'err': err,                                                               //Debug Error Object
      'charge': charge                                                          //Debug Charge Object
    };
    res.send(JSON.stringify(data));                                             //Send data object back to client with code (200)

    var mailOptions = {                                                         //Mail Config
        from: '"ACM Server" <uabacm@gmail.com>',                                  // sender address
        to: 'acm@cis.uab.edu',                                                    // list of receivers
        subject: 'New Membership!',                                               // Subject line
        text: `Name: ${req.body.name} \n BlazerID: ${req.body.blazerid} \n Email: ${req.body.email}`,
    };

    transporter.sendMail(mailOptions, function(error, info){                    //Send the mail
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

  });
};
