let GenerateLetterValues = require('./generate-letter-values')
let GetSocketFromUserID = require('../get-socket-from-user-id')
let mongoose = require('mongoose')

module.exports = async function(self, socket, userID){
  //find a match where the user requesting is not player one, and there is no player two.
  //(so, player one is waiting on a new player)

  console.log("looking for match", userID)

  let match = await self.db.schemas.Match.findOne({'playerOne': {$ne: userID},'playerTwo': {$exists: false}}).populate('playerOne').exec()

  console.log("mf", match)

  if(match){
    let receiver = GetSocketFromUserID(match.playerOne._id.toString(), self)
    if(receiver){
      match = await self.db.schemas.Match.findOneAndUpdate({_id: match._id}, {
        $set: {playerTwo: userID}
      }, {new: true})
      .populate('playerOne', 'name username hat shirt pants body hair')
      .populate('playerTwo', 'name username hat shirt pants body hair')
      
      receiver.emit('MATCH_UPDATED', match)
      socket.emit("MATCH_FOUND", match)
    }
  }else{
    //delete any old matches (garbage collection)
    await self.db.schemas.Match.deleteMany({$or: [{playerOne: userID}, {playerTwo: userID}]})

    //create match
    console.log("should create")
    let letterScores = GenerateLetterValues()
    // match = await self.schemas.Match.create({
    //   playerOne: userID,
    //   letterScores
    // })

    match = await self.db.schemas.Match.findOneAndUpdate({_id: mongoose.Types.ObjectId()}, {
      playerOne: userID,
      letterScores
    }, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      populate: [
        { path: 'playerOne', select: 'name username hat shirt pants body hair' },
      ]
    })
  }

  socket.emit("MATCH_FOUND", match)
}
