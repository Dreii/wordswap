let identifyUserFromSocket = require('./identifyUserFromSocket')

module.exports = (self, socket) => {
  let user = identifyUserFromSocket(socket, self.connectedUsers)

  if(user){
    return self.db.functions.findMatch(user, self)
    .then(match => socket.emit('MATCH_FOUND', match))
    .catch(err => socket.emit('error', err))
  }else{
    socket.emit('err', `SOCKET_USER_MISMATCH socket:${socket.id}, user:${user}`)
  }
}
