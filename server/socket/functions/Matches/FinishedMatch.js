module.exports = async function(self, match, round){
  console.log("Finished match")

  console.log("here is the match", match)

  match = AssignRecentOpponents(match)
  // return await SetELO(self, match, round)

  // await self.db.schemas.Match.deleteOne(({_id: match._id}))
}


function AssignRecentOpponents(match){
  let p1 = match.playerOne,
      p2 = match.playerTwo,
      p2InP1RecentOpponents = p1.recentOpponents.find(previousOpponent=>p2._id === previousOpponent._id),
      p1InP2RecentOpponents = p2.recentOpponents.find(previousOpponent=>p1._id === previousOpponent._id)

  if(!p2InP1RecentOpponents) p1.recentOpponents.push({_id: p2._id, name: p2.name, username: p2.username})
  if(!p1InP2RecentOpponents) p2.recentOpponents.push({_id: p1._id, name: p1.name, username: p1.username})

  while(p1.recentOpponents.length > 10) p1.recentOpponents.shift()
  while(p2.recentOpponents.length > 10) p2.recentOpponents.shift()

  match.playerOne = p1
  match.playerTwo = p2

  return match
}

async function SetELO(self, match, round){

  // let winner = match.round === -1 ? match.playerOne : match.round === -2 ? match.playerTwo : null
  // let loser = match.round === -1 ? match.playerTwo : match.round === -2 ? match.playerOne : null
  //get the current Leaderboard ranking for each player
  let leaderBoardData = {
    rank: 0,
    elo: 1000,
    rankDisplay: '',
    region: 'NA',
    og: true,
    matchesPlayed: 0
  }

  let leaderboardEntries = await Promise.all([
    self.db.schemas.Leaderboard.findOne({userID: match.playerOne._id}),
    self.db.schemas.Leaderboard.findOne({userID: match.playerTwo._id})
  ])

  let p1LeaderboardEntry = leaderboardEntries[0]
  let p2LeaderboardEntry = leaderboardEntries[1]

  console.log(p1LeaderboardEntry, p2LeaderboardEntry)

  if(p1LeaderboardEntry === null) p1LeaderboardEntry = {...leaderBoardData, userID: match.playerOne._id}
  if(p2LeaderboardEntry === null) p2LeaderboardEntry = {...leaderBoardData, userID: match.playerTwo._id}

  let p1ELO = p1LeaderboardEntry.elo
  let p2ELO = p2LeaderboardEntry.elo

  console.log(p1ELO, p2ELO, round)

  p1Rating = Math.pow(10, p1ELO/400)
  p2Rating = Math.pow(10, p2ELO/400)

  console.log("ratings", p1Rating, p2Rating)

  p1Expected = p1ELO/(p1ELO + p2ELO)
  p2Expected = p2ELO/(p1ELO + p2ELO)

  console.log("expected", p1Expected, p2Expected)

  p1Score = round === -1 ? 1 : (round === -2 ? 0 : 0.5)
  p2Score = round === -1 ? 0 : (round === -2 ? 1 : 0.5)

  console.log("scores", p1Score, p2Score)

  p1K = ChooseKFactorFromMatchesPlayed(p1LeaderboardEntry.matchesPlayed)
  p2K = ChooseKFactorFromMatchesPlayed(p2LeaderboardEntry.matchesPlayed)

  let p1NewELO = p1ELO + p1K * (p1Score-p1Expected)
  let p2NewELO = p2ELO + p2K * (p2Score-p2Expected)

  p1LeaderboardEntry.elo = p1NewELO
  p2LeaderboardEntry.elo = p2NewELO

  console.log("winner is", Math.abs(round), "p1", p1NewELO, "p2", p2NewELO)

  let p1TopPlayerQuery, p2TopPlayerQuery
  let bronzeQuery = {elo: {$lte: 1500}}
  let silverQuery = {elo: {$gte: 1501, $lte: 3000}}
  let goldQuery = {elo: {$gte: 3001}}

  if(p1NewELO >= 3001) p1TopPlayerQuery = goldQuery
  else if(p1NewELO >= 1501 && p1NewELO <= 3000)


  self.db.schemas.Leaderboard.find().sort({elo: -1}).limit(1)

  let queries = await Promise.all([
    self.db.schemas.Leaderboard.findOneAndUpdate({userID: match.playerOne._id}, p1LeaderboardEntry, {upsert: true}),
    self.db.schemas.Leaderboard.findOneAndUpdate({userID: match.playerTwo._id}, p2LeaderboardEntry, {upsert: true}),
    self.db.schemas.Leaderboard.find({elo: {$lte: p1NewELO+500, $gte: p1NewELO-500}}).populate('userID', 'name username'),
    self.db.schemas.Leaderboard.find({elo: {$lte: p2NewELO+500, $gte: p2NewELO-500}}).populate('userID', 'name username')
  ])

  // console.log(queries)

  let p1LeaderBoardData = queries[2],
      p2LeaderBoardData = queries[3],
      limitAmnt = 500

  console.log(p1LeaderBoardData.length)

  while(p1LeaderBoardData.length > 100){
    limitAmnt -= 50
    // console.log(limitAmnt, p1LeaderBoardData.length)
    p1LeaderBoardData = p1LeaderBoardData.filter(entry => entry.elo <= p1ELO+limitAmnt && entry.elo >= p1ELO-limitAmnt)
  }

  limitAmnt = 500

  while(p2LeaderBoardData.length > 100){
    limitAmnt -= 50
    p2LeaderBoardData = p2LeaderBoardData.filter(entry => entry.elo <= p2ELO+limitAmnt && entry.elo >= p2ELO-limitAmnt)
  }

  p1LeaderBoardData.sort((a, b) => a.elo > b.elo ? 1 : -1)
  p2LeaderBoardData.sort((a, b) => a.elo > b.elo ? 1 : -1)

  // console.log(p1LeaderBoardData.length, p1LeaderBoardData)

  // console.log(p2LeaderBoardData.length, p2LeaderBoardData)

  return {
    p1: p1LeaderBoardData,
    p2: p2LeaderBoardData
  }
}


function ChooseKFactorFromMatchesPlayed(matchesPlayed){
  if(matchesPlayed < 10) return 64
  else if(matchesPlayed > 10 < 50) return 32
  else if(matchesPlayed > 50) return 24
}
