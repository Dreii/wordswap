let GetSocketFromUserID = require('../get-socket-from-user-id')
let KickUserFromMatch = require('./kick-user-from-match')
let FinishedMatch = require('./FinishedMatch')

module.exports = async function(self, requests){

  //find the curent match using the ID provided
  let currentMatch = await self.db.schemas.Match.findOne({_id: requests.matchID}).exec()

  //the word history
  let history1 = currentMatch.playerOneHist,
      history2 = currentMatch.playerTwoHist,
      score    = currentMatch.score,
      p1Socket,
      p2Socket

  let bothRequests = [requests.request1, requests.request2]

  bothRequests.forEach(request => {
    if(request.player === 1){
      history1.push(request.word)
      p1Socket = request.socket
    }

    if(request.player === 2){
      history2.push(request.word)
      p2Socket = request.socket
    }

    //the word letterScore
    let total = 0
    request.word.toUpperCase().split('').forEach((letter) => {
      let letterValue = currentMatch.letterScores.find(letterScore => letterScore.letter === letter)
      letterValue = (letterValue === undefined) ? 0 : letterValue.score
      total += letterValue*100
    })
    score += (request.player === 1 ? -total : total)

    if(request.word === 'ILILILILILILILILILLIILILILILILILILILILILILILILILILILILILI'){
      score += -100000
    }
  })

  //the round and turn / win state
  let round = currentMatch.round
  round += 1
  if(score > 2000-round*100) round = -2
  if(score < round*100) round = -1
  if(round > 10) round = -3

  //compile update object
  update = {
    playerOneHist: history1,
    playerTwoHist: history2,
    score,
    round
  }

  //initiate update
  let match = await self.db.schemas.Match.findOneAndUpdate({_id: requests.matchID}, update, {new: true})
  .populate('playerOne', 'name username hat shirt pants body hair recentOpponents')
  .populate('playerTwo', 'name username hat shirt pants body hair recentOpponents')
  .exec()

  match = match.toObject()

  console.log(match)

  if(round < 0){
    let finishedMatchData, p1LeaderBoardData = [], p2LeaderBoardData = []

    await FinishedMatch(self, match, round, p1Socket, p2Socket)
  }else{
    self.io.to(p1Socket).emit('MATCH_UPDATED', match)
    self.io.to(p2Socket).emit('MATCH_UPDATED', match)
  }
}
