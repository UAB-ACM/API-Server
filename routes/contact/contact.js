/* Switching to Strict Mode */
'use strict';                                                                   //Converts mistakes to errors

/* Configuration */
var config = require('../../config.json');                                      

/* Libraries */
var nodemailer = require('nodemailer');                                         //Mailer Library

/* Mail Sender Setup */
var transportString = `smtps://${config.email.username}%40${config.email.domain}:${config.email.password}@${config.email.smtpServer}`
var transporter = nodemailer.createTransport(transportString);                  //Open SMTP Connection


/* Exporting route */
module.exports = function (req, res) {                                          //Export the function that is used to handle the web request
  console.log('New Contact Request');                                             //Logging out to server

  var mailOptions = {                                                             //Mail Config
      from: '"ACM Server" <uabacm@gmail.com>',                                      //Sender Address
      to: 'acm@cis.uab.edu',                                                        //Receiver Address
      subject: 'New Contact Form!',                                                 //Message Subject
      text: `Name: ${req.body.name} \n Email: ${req.body.email} \n Message: ${req.body.message}`,//Message Body
  };

  transporter.sendMail(mailOptions, function(error, info){                        //Send the email
      if(error) res.status(500).send('Email Not Sent');                             //If error send error back to client

      console.log('Message sent: ' + info.response);                                //Logging out to server
      res.send('Message Sent');                                                     //Sending success back to client

  });
};
