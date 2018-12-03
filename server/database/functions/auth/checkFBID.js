module.exports = (self) => (fbUserID) => {
  return self.schemas.User.findOne({fbUserID}).exec()
}
