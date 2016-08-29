//Switching to Strict JS
"use strict";                                                                   //Converts mistakes to errors

var stripe     = require('stripe')("sk_test_hi3BnIVjjC9efZfbVwlnmSrH");         //Stripe Payment Library

//Exporting route
module.exports = function (req, res) {                                          //Export the function that is used to handle the web request
  console.log(req.body.blazerid);
  console.log(req.body.email);
  console.log(req.body.phone);
  console.log(req.body.token);

  stripe.charges.create({                                                       //Create a stripe charge
    amount: 1000,                                                               //Amount is 1000 cents ($10.00)
    currency: "usd",                                                            //The currency is US Dollar
    source: req.body.token.id,                                                  //Getting credit card token from request
    description: "1 Year Membership charge for " + req.body.blazerid,           //Setting the description for the charge
    receipt_email: req.body.email,                                              //Where to send the charge receipt
    metadata: {'order_id': req.body.blazerid}                                   //Extra metadata for tracking
  },

  function(err, charge){                                                        //Charge callback function
    var data = {                                                                //Data object to send back to client
      "err": err,                                                               //Debug Error Object
      "charge": charge                                                          //Debug Charge Object
    };
    res.send(JSON.stringify(data));                                             //Send data object back to client with code (200)
  });
}; 

