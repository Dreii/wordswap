var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
  name: "Leaderboard",
  model:{
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    league: {type: String},
    elo: {type: Number, default: 1000},
    og: {type: Boolean, default: true},
    matchesPlayed: {type: Number, default: 0},
    timestamp: {type: Number},
  }
}
