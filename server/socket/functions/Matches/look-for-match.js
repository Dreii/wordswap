let GenerateLetterValues = require('./generate-letter-values')
let GetSocketFromUserID = require('../get-socket-from-user-id')
let mongoose = require('mongoose')

module.exports = async function(self, socket, userID){
  //delete any old matches (garbage collection)
  await self.db.schemas.Match.deleteMany({$or: [{playerOne: userID}, {playerTwo: userID}]})

  //find all matches where the user requesting is not player one, and there is no player two.
  //(so, player one is waiting on a new player)
  let matches = await self.db.schemas.Match.find({'playerOne': {$ne: userID},'playerTwo': {$exists: false}}).exec()

  //prepare placeholders for the new match
  let receiver, selectedMatch

  //if matches are found,
  if(matches.length > 0){
    //cycle through matches making sure that one has an active user
    for(let i = 0; i < matches.length; i++){
      //get the socket from the userID of the other player.
      receiver = GetSocketFromUserID(matches[i].playerOne, self)

      if(receiver !== null){
        //if a socket is found, select this match and break the loop
        selectedMatch = match
        break
      }
    }
  }
  //if a match could be found,
  if(selectedMatch !== undefined){
    //update the located match to include the player who is looking, as player two
    match = await self.db.schemas.Match.findOneAndUpdate({_id: match._id}, {
      $set: {playerTwo: userID}
    }, {new: true})
    //populate usefull fields for each user so that the client can display the correct clothing
    .populate('playerOne', 'name username hat shirt pants body hair')
    .populate('playerTwo', 'name username hat shirt pants body hair')

    //if player one has a socket attached still, go update them.
    if(receiver) receiver.emit('MATCH_UPDATED', match)
    //update the requesting user as well that they found a match
    socket.emit("MATCH_FOUND", match)
  }else{
    //if a match cannot be found,
    //create match with random letter values and the player one field filled with the requesting user
    match = await self.db.schemas.Match.findOneAndUpdate({_id: mongoose.Types.ObjectId()}, {
      playerOne: userID,
      letterScores: GenerateLetterValues()
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

  //Send to the client that a match has been found.
  socket.emit("MATCH_FOUND", match)
}
