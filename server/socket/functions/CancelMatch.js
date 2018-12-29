let GetSocketFromUserID = require('../../functions/GetSocketFromUserID')

module.exports = async function(self, socket, matchID){
  //here we will remove the socket paired user from any match they are in
  //and set the other user to have won.
  let match = await self.db.schemas.Match.findOne({_id: matchID}).populate('playerOne').populate('playerTwo').exec()

  let receiver, newMatch
  if(match){
    if(match.playerTwo !== undefined){
      newMatch = await self.db.schemas.Match.findOneAndUpdate({_id: matchID}, {round: -1}, {new: true}).populate('playerOne').populate('playerTwo')
      receiver = GetSocketFromUserID(match.playerTwo._id.toString(), self)
      if(receiver) return receiver.emit('MATCH_UPDATED', newMatch)
    }else{
      await self.db.schemas.Match.findOneAndDelete({_id: matchID})
    }
  }else{
    return null
  }
}
