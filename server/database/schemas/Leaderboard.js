var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let personEntry = {
  userID: {type: Schema.Types.ObjectId, ref: 'User'},
  rank: {type: Number, default: 0},
  elo: {type: Number, default: 1000},
  rankDisplay: {type: String, default: ''},
  region: {type: String, default: 'NA'},
  og: {type: Boolean, default: true},
  matchesPlayed: {type: Number, default: 0}
}

module.exports = {
  name: "Leaderboard",
  model:{
    region: {type: String, default: "NA"},
    BronzeLeague: [personEntry],
    SilverLeague: [personEntry],
    GoldLeague:   [personEntry]
  }
}
