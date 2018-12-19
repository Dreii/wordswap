module.exports = (socket, connectedUsers) => {
  let socketUser = connectedUsers.find(obj => obj.socket === socket.id)
  if(socketUser) return socketUser.user
  else return null
}
