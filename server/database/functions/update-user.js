module.exports = (self) => (id, data) => {
  console.log(id, data)
  return self.schemas.User.updateOne({_id: id}, data).exec();
}
