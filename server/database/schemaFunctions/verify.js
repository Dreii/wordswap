module.exports = (email) => {
    return self.schemas.user.findOne({email}).exec();
  }
