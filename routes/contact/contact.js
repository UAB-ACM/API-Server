//Switching to Strict JS
'use strict';                                                                   //Converts mistakes to errors

//Exporting route
module.exports = function (req, res) {                                          //Export the function that is used to handle the web request
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.message);
  console.log();

  res.send('OK');                                                               //Send data object back to client with code (200)
};
