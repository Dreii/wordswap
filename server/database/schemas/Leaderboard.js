var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
  name: "Leaderboard",
  model:{
    userID: {type: Schema.Types.ObjectId, red: 'User'},
    rank: {type: Number, default: 0},
    rankDisplay: {type: String, default: ''}
  }
}
