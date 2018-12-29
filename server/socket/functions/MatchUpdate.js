let GetSocketFromUserID = require('../../functions/GetSocketFromUserID')
let KickUserFromMatch = require('./KickUserFromMatch')

module.exports = async function(self, requests){

  //find the curent match using the ID provided
  let currentMatch = await self.db.schemas.Match.findOne({_id: requests.matchID}).populate('playerOne').populate('playerTwo').exec()

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
    request.word.toUpperCase().split('').forEach((letter)=>{
      let letterValue = currentMatch.letterScores.find(letterScore => letterScore.letter === letter)
      letterValue = (letterValue === undefined) ? 0 : letterValue.score
      total += letterValue*100
    })
    score += (request.player === 1 ? -total : total)
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
  let match = await self.db.functions.updateMatch(requests.matchID, update)
  self.io.to(p1Socket).to(p2Socket).emit('MATCH_UPDATED', match)
}
