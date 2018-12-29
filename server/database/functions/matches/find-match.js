let getRandomLetterValues = require('../../../functions/getRandomLetterValues')
let GetSocketFromUserID = require('../../../functions/GetSocketFromUserID')

module.exports = (self) => async function(userID, socketController){
  let match = await self.schemas.Match.findOne({'playerOne': {$ne: userID},'playerTwo': {$exists: false}}).populate('playerOne').exec()
  if(match){
    let receiver = GetSocketFromUserID(match.playerOne._id.toString(), socketController)
    if(receiver){
      match = await self.functions.updateMatch(match._id, {
        playerTwo: userID
      })
      receiver.emit('MATCH_UPDATED', match)
    }
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
