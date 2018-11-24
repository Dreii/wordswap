const mongoose = require('mongoose');

module.exports = {
  "create": (Schema, selector, data) => {
    return Schema.create(data)
  },
  "create-multi": (Schema, selector, data) =>{
    return Schema.insertMany(data)
  },
  "read": (Schema, selector, data, populators) => {
    let func = Schema.findById(selector)
    populators.forEach((pop)=>{
      func = func.populate(pop)
    })
    return func.exec()
  },
  "read-multi": (Schema, selector, data, populators) => {
    let func =  Schema.find({'_id': {$in: createIdList(selector)}})
    populators.forEach((pop)=>{
      func = func.populate(pop)
    })
    return func.exec()
  },
  "update": (Schema, selector, data) => {
    return Schema.findByIdAndUpdate(selector, data, {new: true, runValidators: true}).exec()
  },
  "update-multi": (Schema, selector, data) => {
    return Schema.updateMany({_id: {$in: createIdList(selector)}}, data).exec()
    .then(()=>Schema.find({_id: {$in: createIdList(selector)}}))
  },
  "delete": (Schema, selector, data) => {
    return Schema.findOneAndRemove({_id: selector}).exec()
  },
  "delete-multi": (Schema, selector, data) => {
    return Schema.find({_id: {$in: createIdList(selector)}}).exec()
    .then((findData)=>{
      return Schema.deleteMany({_id: {$in: createIdList(selector)}}).exec()
      .then(() => findData)
    })
  },
  "link": (Schema, to, from, where, type) => {
    let typeOrPush = type === "push" ? {
      $push: { [where]: from }
    } : {
      $set: { [where]: from }
    }

    return Schema.findByIdAndUpdate(to, typeOrPush, {new: true, runValidators: true}).exec()
    .then((data)=>{
      return data
    })
  }
}

function createIdList(selector){
  if(!Array.isArray(selector)) selector = [selector];

  let queryArray = [];
  selector.forEach((id)=>{
    queryArray.push(mongoose.Types.ObjectId(id))
  });
  return queryArray;
}
