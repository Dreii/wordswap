var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
  name: "User",
  model:{
    name: {type: String, default: ''},
    email: {type: String, default: ''},
    username: {type: String, unique: true},
    password: {type: String},
    fbUserID: {type: String, default:''},
    fbAccessToken: {type: String, default :''},
    rank: {type: Number, default: 0},
    money: {type: Number, default: 0},
    gems: {type: Number, default: 0},
    hat: {type: Schema.Types.ObjectId, ref: 'Clothing'},
    shirt: {type: Schema.Types.ObjectId, ref: 'Clothing'},
    pants: {type: Schema.Types.ObjectId, ref: 'Clothing'},
    body: {type: Schema.Types.ObjectId, ref: 'Clothing'},
    hair: {type: Schema.Types.ObjectId, ref: 'Clothing'},
    trunk: [{type: Schema.Types.ObjectId, ref: 'Clothing'}],
    settings: [Object],
    friends: [{type: Schema.Types.ObjectId, red: 'User'}]
  }
}
