module.exports = async function(self, socket, requesterID){
  if(requesterID !== undefined){
    let entry = await self.db.schemas.Leaderboard.findOne({user: requesterID}).exec()
    console.log("leaderboard entry", requesterID, entry)
    if(entry === null || entry.league === 'unranked'){
      socket.emit('LEADERBOARD_DATA_RETURNED', entry)
    }else{
      let league = self.db.schemas.Leaderboard.find({league: entry.league}).populate('user', 'name username').sort({elo: -1})
      let topPlayer = self.db.schemas.Leaderboard.findOne({league: entry.league}).populate('user', 'username hat shirt body hair pants').sort({elo: -1}).limit(1)
      let results = await Promise.all([league, topPlayer])

      results[0][0] = results[1]

      socket.emit('LEADERBOARD_DATA_RETURNED', results[0])
    }

  }else{
    socket.emit('err', "no id sent with request")
  }
}
