GetUserIDFromSocketID = require('../get-user-id-from-socket-id')
GetSocketFromUserID = require('../get-socket-from-user-id')

/**
 * Decline a challenge and notify the sender
 * @param  {[SocketController]} self                [The Socket Controller handling this request]
 * @param  {[SocketObject]} socket              [The Socket making the request]
 * @param  {[String]} challengeSenderID [The sender of the original challenge]
 */

module.exports = async function(self, socket, challengeSenderID){
    console.log("decline challenge")
    let challengeReceiverID = GetUserIDFromSocketID(socket.id, self.connectedUsers)
    await self.db.schemas.User.findOneAndUpdate({_id: challengeReceiverID}, {$unset: {challenge: ""}})

    let challengeSenderSocket = GetSocketFromUserID(challengeSenderID, self)
    if(challengeSenderSocket !== null) challengeSenderSocket.emit("CHALLENGE_REJECTED", "declined")
}
