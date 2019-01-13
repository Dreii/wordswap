let GetSocketFromUserID = require('../get-socket-from-user-id')
let GenerateLetterValues = require('../Matches/generate-letter-values')
let mongoose = require('mongoose')
/**
 * Cancel a challenge and notify the receiver
 * @param  {[SocketController]} self                [The Socket Controller handling this request]
 * @param  {[type]} socket              [The Socket making the request]
 * @param  {[type]} challengeSenderID [The sender of the original challenge]
 * @param  {[type]} challengeReceiverID [The receiver of the original challenge]
 */

module.exports = async function(self, socket, p1, p2){
  console.log("CHALLENGE ACCEPTED!", p1, p2)

  let deleteOldMatches = self.db.schemas.Match.deleteMany({$or: [{playerOne: p1}, {playerTwo: p1}, {playerOne: p2}, {playerTwo: p2}]})
  let unsetChallenge = self.db.schemas.User.findOneAndUpdate({_id: p2}, {$unset:{challenge: {}}})

  await deleteOldMatches
  await unsetChallenge

  let letterScores = GenerateLetterValues()

  let match = await self.db.schemas.Match.findOneAndUpdate({_id: mongoose.Types.ObjectId()}, {
    playerOne: p1,
    playerTwo: p2,
    letterScores
  }, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
    populate: [
      { path: 'playerOne', select: 'name username hat shirt pants body hair' },
      { path: 'playerTwo', select: 'name username hat shirt pants body hair' }
    ]
  })

  let p1Socket = GetSocketFromUserID(p1, self)
  let p2Socket = GetSocketFromUserID(p2, self)

  if(p1Socket === null || p2Socket === null && !(p1Socket === null && p2Socket === null)){
    if(p1Socket === null) p2Socket.emit("CHALLENGE_REJECTED", "busy")
    else p1Socket.emit("CHALLENGE_REJECTED", "busy")
  }
  else self.io.to(p1Socket.id).to(p2Socket.id).emit("CHALLENGE_ACCEPTED", match)
}


//remove the challenge from the acceptor, also do this in client
