module.exports = (self) => (username) => {
  return self.schemas.User.findOne({username}).exec()
}
