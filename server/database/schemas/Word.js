var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = {
  name: "Word",
  model:{
    firstLetter: String,
    lastLetter: String,
    word: String,
  }
}
