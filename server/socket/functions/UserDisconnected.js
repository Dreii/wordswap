module.exports = (self, socket) => {
  //find the index of the user socket object which
  //coresponds to the socket that disconnected
  let index = self.connectedUsers.findIndex(obj =>{
    return obj.socket === socket
  })

  //splice out the user socket object at that findIndex
  //from the list of connected users
  self.connectedUsers.splice(index, 1)

  console.log("disconnect", self.connectedUsers);
}
