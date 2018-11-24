var bcrypt = require('bcryptjs');

module.exports = (Schema, body) => {

  let data = body.request.data

  if(!data.username) throw new Error('Missing Username')
  if(!data.password) throw new Error('Missing Password')

  return Schema.findOne({'username': data.username})
  .populate({
    path: 'matches',
    populate: { path: 'playerOne'},
  })
  .populate({
    path: 'matches',
    populate: {path: 'playerTwo'}
  }).exec()
  .then((user)=>{
    let compare = user ? bcrypt.compareSync(data.password, user.password) : false
    if(compare) return user;
    else {
      return Promise.reject(new Error("no auth").toString())
    }
  })
}
