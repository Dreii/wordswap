var bcrypt = require('bcryptjs');
module.exports = (Schema, body) => {
  body.request.data.password = bcrypt.hashSync(body.request.data.password, 8)
  return Schema.create(body.request.data)
}
