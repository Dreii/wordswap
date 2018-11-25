var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
  name: "User",
  model:{
    firstname: {type: String, default: ''},
    lastname: {type: String, default: ''},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
    rank: {type: Number, default: 0},
    hat: {type: Schema.Types.ObjectId, ref: 'Clothing'},
    shirt: {type: Schema.Types.ObjectId, ref: 'Clothing'},
    pants: {type: Schema.Types.ObjectId, ref: 'Clothing'},
    body: {type: Schema.Types.ObjectId, ref: 'Clothing'},
    hair: {type: Schema.Types.ObjectId, ref: 'Clothing'},
    trunk: [{type: Schema.Types.ObjectID, ref: 'Clothing'}]
  }
}
