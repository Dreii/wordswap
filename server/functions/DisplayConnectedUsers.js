module.exports = (list, message) => {
  string = '\n\n\n\n\n\n\n\n\n\n\n\n'
  if(message) string += message+'\n\n'

  string += 'USER                              SOCKET\n-------------------------------------------------------\n'
  if(list){
    list.forEach(item => {
      string += `${item.user.toString()}          ${item.socket.toString()}\n`
    })
  }
  let now = new Date()
  string += '\n'+now.toLocaleDateString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric'})
  console.log(string)
}
