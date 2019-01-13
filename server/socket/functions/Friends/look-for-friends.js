/**
 * [Send array of users that fit a query]
 * @param  {[SocketController]} self   [Socket Controller handling request]
 * @param  {[SocketObject]} socket [Socket making the request]
 * @param  {[String]} userID [userID of the user making the request]
 * @param  {[String]} query  [The search query to check against]
 */

module.exports = async function(self, socket, userID, query){
  console.log(socket.id, userID, query)
  query = {$regex: query, $options: "i"}
  let list = await self.db.schemas.User.find(
    {
      $and:[
        {
          $or:[
            {username: query}, {name: query}
          ]
        },
        {
          _id: {$ne:userID}
        }
      ]
    }
  ).limit(20).select('name username')

  socket.emit("FRIEND_SEARCH_RESPONSE", list)
}
