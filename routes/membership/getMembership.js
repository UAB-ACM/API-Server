/* Switching to Strict Mode */
'use strict';                                                                   //Converts mistakes to errors

/* Configuration */
var config = require('../../config.json');

/* Libraries */
var mysql      = require('mysql');                                              //MySQL Library

/* MySQL Connection Setup */
var db = mysql.createConnection(config.database);
    db.connect();

/* Exporting route */
module.exports = function (req, res) {                                          //Export the function that is used to handle the web request
  console.log(`Lookup membership for ${req.body.blazerid}`);                      //Logging out to server

  var query = `SELECT *
                 FROM membership
                WHERE blazer_id = '${req.body.blazerid}';`;

  db.query(query, function(err, rows, fields) {                                 //Registering User with Database
    if (err){
      res.status(500).send('Database Error');
      throw err
    };

    if(rows.length === 0) res.status(400).send('Blazer ID is not a Member');
    else res.send(rows[0]);
  });
};
