module.exports = (self) => (data) => {
  let newUser = new self.schemas.User(data);

  return newUser.save();
}
