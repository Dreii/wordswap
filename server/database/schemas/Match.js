const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
  name:"Match",
  model:{
    playerOne: {type: Schema.Types.ObjectId, ref:'User'},
    playerTwo: {type: Schema.Types.ObjectId, ref:'User'},
    score: {type: Number, default: 1000},
    playerOneHist: {type: [String], default: []},
    playerTwoHist: {type: [String], default: []},
    round: {type: Number, default: 0},
    turn: {type: Number, default: 0},
    letterScores: {type: [{letter: String, score: Number}], default:[]},
    chatLogs: {type: [{player: String, message: String}], default: []},
  }
}
