let getRandomLetterValues = require('../../../functions/getRandomLetterValues')

module.exports = (self) => async function(userID, socketController){
  let match = await self.schemas.Match.findOne({'playerOne': {$ne: userID},'playerTwo': {$exists: false}}).populate('playerOne').exec()
  if(match){
    let receiver = GetSocketFromUserID(match.playerOne._id.toString(), socketController)

    match = await self.functions.updateMatch(match._id, {
      playerTwo: userID
    }, receiver)
  }else{
    //delete any old matches (garbage collection)
    await self.schemas.Match.deleteMany({$or: [{playerOne: userID}, {playerTwo: userID}]})

    //create match
    console.log("should create")
    let letterScores = getRandomLetterValues()
    match = await self.schemas.Match.create({
      playerOne: userID,
      letterScores
    })
  }

  return match
}

GetSocketFromUserID = (userID, socketController) => {
  let receiver = socketController.connectedUsers.find(obj => obj.user === userID.toString())
  if(receiver) receiver = receiver.socket

  return socketController.io.sockets.connected[receiver]
}
