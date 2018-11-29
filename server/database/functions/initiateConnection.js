const mongoose = require('mongoose')
module.exports = () => {
  //Set up default mongoose connection
  const mongoDB = 'mongodb://user:!enterW16@ds121331.mlab.com:21331/wordswap'
  mongoose.connect(mongoDB, { useNewUrlParser: true })
  mongoose.set('useCreateIndex', true)
  // Get Mongoose to use the global promise library
  mongoose.Promise = global.Promise
  //Get the default connection
  var conn = mongoose.connection

  //Bind connection to error event (to get notification of connection errors)
  conn.on('error', console.error.bind(console, 'MongoDB connection error:'))
}
