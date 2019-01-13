GetSocketFromUserID = require('../get-socket-from-user-id')

/**
 * Cancel a challenge and notify the receiver
 * @param  {[SocketController]} self                [The Socket Controller handling this request]
 * @param  {[type]} socket              [The Socket making the request]
 * @param  {[type]} challengeReceiverID [The receiver of the original challenge]
 */

module.exports = async function(self, socket, challengeReceiverID){
    console.log("cancel challenge", challengeReceiverID)
    await self.db.schemas.User.findOneAndUpdate({_id: challengeReceiverID}, {$unset: {challenge: ""}})
    let challengeReceiverSocket = GetSocketFromUserID(challengeReceiverID, self)
    if(challengeReceiverSocket !== null) challengeReceiverSocket.emit("CHALLENGE_CANCELLED")
}
