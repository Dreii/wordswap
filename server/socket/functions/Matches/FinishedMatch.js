let AssignRecentOpponents = require('./AssignRecentOpponents')
let UpdateLeagueEntry = require('./UpdateLeagueEntry')

module.exports = async function(self, match, round, p1Socket, p2Socket){
  //Add each user to the other users recent opponents list if they are not already there
  let updatedLeagueEntry = await UpdateLeagueEntry(self, match, round)
  // console.log(match)
  // console.dir(match)
  // console.log("updated ELO", updatedLeagueEntry)

  let finishedMatchData = await Promise.all([
    //[0]//////////////////////////////////////////////////////////
    updatedLeagueEntry[0].league == 'unranked' ? (
      //if player is unranked just return the leaderboard entry for that user
      updatedLeagueEntry[0]
    ) : (
      //if player is not unranked then return the league that they are in
      self.db.schemas.Leaderboard.find({league: updatedLeagueEntry[0].league}).populate('user', 'username hat shirt body hair pants').sort({elo: -1})
    ),

    //[1]//////////////////////////////////////////////////////////
    updatedLeagueEntry[1].league === 'unranked' ? (
      updatedLeagueEntry[0]
    ) : (
      self.db.schemas.Leaderboard.find({league: updatedLeagueEntry[1].league}).populate('user', 'username hat shirt body hair pants').sort({elo: -1})
    ),

    //[2]//////////////////////////////////////////////////////////
    AssignRecentOpponents(self, match)
  ])

  let p1LeaderBoardData = finishedMatchData[0]
  let p2LeaderBoardData = finishedMatchData[1]

  // console.log(finishedMatchData)

  console.log("Match finished should send")
  self.io.to(p1Socket).emit('MATCH_FINISHED', {...match, round}, p1LeaderBoardData)
  self.io.to(p2Socket).emit('MATCH_FINISHED', {...match, round}, p2LeaderBoardData)

  return true
}
