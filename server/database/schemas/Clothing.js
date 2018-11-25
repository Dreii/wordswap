const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
  name:"Clothing",
  model:{
    username: {type: String, unique: true, required: true},
    price: {type: Number, default: 0},
    model: {type: Number, unique: true, required: true},
    textures: {type: [String], default: []},
    description: {type: String, default: ""}
  }
}
