/**
 * [Displays current list of users connects to Socket Controller in an easy to see way.]
 * @param  {[Array]} list    [Array of objects with user, and socket keys]
 * @param  {[String]} message [A message to display with the list for context]
 */

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
