var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
  name: "League",
  model:{
    level: {type: String},
    count: {type: Number},
    botCount: {type: Number},
    timestamp: {type: Number},
  }
}
