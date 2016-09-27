//Switching to Strict JS
'use strict';                                                                   //Converts mistakes to errors
var config = require('../../config.json');                                      //Config


var nodemailer = require('nodemailer');                                         //Mailer Library
var transportString = `smtps://${config.email.username}%40${config.email.domain}:${config.email.password}@${config.email.smtpServer}`
var transporter = nodemailer.createTransport(transportString);                  //Open SMTP Connection


//Exporting route
module.exports = function (req, res) {                                          //Export the function that is used to handle the web request
  console.log('New Contact Request');
  var mailOptions = {                                                         //Mail Config
      from: '"ACM Server" <uabacm@gmail.com>',                                  // sender address
      to: 'acm@cis.uab.edu',                                                    // list of receivers
      subject: 'New Contact Form!',                                               // Subject line
      text: `Name: ${req.body.name} \n Email: ${req.body.email} \n Message: ${req.body.message}`,
  };

  transporter.sendMail(mailOptions, function(error, info){                    //Send the mail
      if(error){
          res.status(500).send('Email Not Sent');
      }
      console.log('Message sent: ' + info.response);
      res.send('Message Sent');                                                               //Send data object back to client with code (200)

  });
};
