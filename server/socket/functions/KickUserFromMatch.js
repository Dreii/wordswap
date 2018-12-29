let GetSocketFromUserID = require('../../functions/GetSocketFromUserID')

module.exports = async function(self, userID){
  //here we will remove the socket paired user from any match they are in
  //and set the other user to have won.
  let match = await self.db.schemas.Match.findOne({$or: [{playerOne: userID}, {playerTwo: userID}]}).exec()

  let receiver, newMatch
  if(match !== null && match.round >= 0){
    if(match.playerOne.toString() === userID.toString()){
      newMatch = await self.db.schemas.Match.findOneAndUpdate({playerOne: userID}, {round: -2}, {new: true}).populate('playerOne').populate('playerTwo')
      receiver = (match.playerTwo !== undefined) ? (
        GetSocketFromUserID(match.playerTwo.toString(), self)
      ): null
    }else if(match.playerTwo.toString() === userID.toString()){
      newMatch = await self.db.schemas.Match.findOneAndUpdate({playerTwo: userID}, {round: -1}, {new: true}).populate('playerOne').populate('playerTwo')
      receiver = (match.playerOne !== undefined) ? (
        GetSocketFromUserID(match.playerOne.toString(), self)
      ): null
    }

    console.log(receiver, newMatch)
    if(receiver) return receiver.emit('MATCH_UPDATED', newMatch)
  }else{
    return null
  }
}
