module.exports = (Schema, selector, data, populate, app) => {
  let location = data.player === 1 ? "playerOneHist" : "playerTwoHist"

  //check for word in database =>
  // app.db.schemas.Word.findOne({word: data.word}).then()
  //add word to the history for the player =>
  return Schema.findByIdAndUpdate(selector, {$push: {[location]: data.word.toUpperCase()}, turn: data.turn, score: data.score}, {new: true, runValidators: true})
  .populate('playerOne')
  .populate('playerTwo')
  .then((match)=>{
    app.io.updateMatch(match, data.player)

    return match
  })
  //Ping other player in socket or push notif =>
  //send back the match that was changed
}
