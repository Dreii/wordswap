//Initialize Express app.
const express = require("express");
const app = express();

require('dotenv').config()

//Setup encryption tools.
app.jwt = require('jsonwebtoken');
app.bcrypt = require('bcryptjs');
app.config = require('./config');

//Set how request body's are parsed.
app.bodyParser = require('body-parser');
app.use(app.bodyParser.json());
app.use(app.bodyParser.urlencoded({
  extended: true
}));

app.wordlist = require('../wordlist/createWordList')()

// app.io = require('socket.io')()
// require('./setupSocketConnections')(app, 8000)

//Prepare DB schema's.
app.mongoose = require('mongoose');
app.mongoose.Promise = Promise;
app.db = require("../database/database-controller");
app.db.init();

//Set Port information
app.set("port", process.env.PORT || 3001);

//Make sure we only serve static assets in production.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Set defaults for error handling.
process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error);
});

module.exports = app;
