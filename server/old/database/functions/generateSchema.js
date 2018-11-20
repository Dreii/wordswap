const mongoose = require('mongoose');

module.exports = (modelName, modelObject, ...middleware) => {
  const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

  const NewSchema = new Schema(modelObject);

  NewSchema.pre('save', function(next){
    let currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
      this.created_at = currentDate;

    next();
  });

  return mongoose.model(modelName, NewSchema)
}
