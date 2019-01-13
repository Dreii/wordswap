let MatchUpdate = require('./match-update')
let GetSocketFromUserID = require('../get-socket-from-user-id')
let KickUserFromMatch = require('./kick-user-from-match')

module.exports = (self, data, socket) => {
  console.log(data)
  data = JSON.parse(data)
  let matchFound = false

  let socketID = socket.id
  let kickTimer = setTimeout(()=>{
    KickTimer(self, data)
  }, 20*1000)

  let newRequest = {...data, socket: socketID, kickTimer}

  self.matchUpdateRequests.forEach((request, i)=>{
    if(request.matchID === newRequest.matchID){
      matchFound = true
      requests = {
        matchID: request.matchID,
        request1: {
          word: request.word,
          player: request.player,
          socket: request.socket,
          kickTimer: request.kickTimer
        },
        request2: {
          word: newRequest.word,
          player: newRequest.player,
          socket: newRequest.socket,
          kickTimer: newRequest.kickTimer
        }
      }

      clearTimeout(request.kickTimer)
      clearTimeout(newRequest.kickTimer)
      self.matchUpdateRequests.splice(i, 1)
      MatchUpdate(self, requests)
    }
  })

  if(!matchFound){
    self.matchUpdateRequests.push(newRequest)
  }
}


async function KickTimer(self, data){
  let match = await self.db.schemas.Match.findOne({_id: data.matchID})
  if(match){
    let troublePlayer = (data.player === 1) ? match.playerTwo : match.playerOne
    let troubleSocket = GetSocketFromUserID(troublePlayer, self)
    if(troubleSocket === null) KickUserFromMatch(self, troublePlayer)
  }

  else return null
}
