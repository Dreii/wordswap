let GetSocketFromUserID = require('../get-socket-from-user-id')
let GetUserFromSocketID = require('../get-user-id-from-socket-id')

/**
 * [description Sends a challenge to the userID specified]
 * @param  {[SocketController]} self                [the socket controller object calling this function]
 * @param  {[SocketObject]} socket              [the socket that sent the request]
 * @param  {[String]} challengeReceiverID [the user id of the person being challenged]
 */

module.exports = async function(self, socket, challengeReceiverID){
  console.log(challengeReceiverID)
  let challengeSenderID = GetUserFromSocketID(socket.id, self.connectedUsers)

  let challengeSenderData = await self.db.schemas.User.findOne({_id: challengeSenderID}).select('username name')

  let challengeReceiver = await self.db.schemas.User.findOne({_id: challengeReceiverID}).select('challenge')

  let challengeReceiverSocket = GetSocketFromUserID(challengeReceiverID, self)

  console.log("should we send a chalenge?", challengeReceiver.challenge, challengeReceiverSocket ? challengeReceiverSocket.id:null)
  if(challengeReceiver.challenge !== undefined || challengeReceiverSocket === null){
    console.log("should be rejecting challenge")
    socket.emit("CHALLENGE_REJECTED", "busy")
  }
  else{
    await self.db.schemas.User.findOneAndUpdate({_id: challengeReceiverID}, {challenge: challengeSenderData})
    console.log("sending challenge")
    challengeReceiverSocket.emit("CHALLENGE_RECEIVED", challengeSenderData)
    setTimeout(
      ()=>TimeoutChallenge(self, socket, challengeReceiverID, challengeSenderData),
      60*1000, self, socket, challengeReceiverID, challengeSenderData
    )
  }
}

async function TimeoutChallenge(self, socket, challengeReceiverID, challengeSenderData){
  let challengeReceiver = await self.db.schemas.User.findOne({_id: challengeReceiverID}).select('challenge')
  // console.log("checking...", challengeReceiver.challenge._id, challengeSenderData._id, (challengeReceiver.challenge._id === challengeSenderData._id))
  //if the challenge is still waiting in the receivers box after a minute, its not been accepted and has timed out
  if(challengeReceiver.challenge !== undefined && challengeReceiver.challenge._id.toString() === challengeSenderData._id.toString()){
    let cancelRes = await self.db.schemas.User.findOneAndUpdate({_id: challengeReceiverID}, {$unset: {challenge: ""}})
    socket.emit("CHALLENGE_REJECTED", "timeout")
  }

  if(challengeReceiver.challenge === undefined) socket.emit("CHALLENGE_REJECTED", "timeout")
}
