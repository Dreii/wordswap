let getRandomLetterValues = require('../../../functions/getRandomLetterValues')

module.exports = (self) => async function(userID, socket){
  let match = await self.schemas.Match.findOne({'playerOne': {$ne: userID},'playerTwo': {$exists: false}}).populate('playerOne').exec()
  if(match){
    match = await self.functions.updateMatch(match._id, {
      playerTwo: userID
    }, socket)
  }else{
    //delete any old matches (garbage collection)
    await self.schemas.Match.deleteMany({$or: [{playerOne: userID}, {playerTwo: userID}]})

    //create match
    console.log("should create")
    let letterValues = getRandomLetterValues()
    match = await self.schemas.Match.create({
      playerOne: userID,
      letterValues: letterValues
    })
  }

  return match
}
