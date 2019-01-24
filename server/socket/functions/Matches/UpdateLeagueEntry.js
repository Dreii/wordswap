let RandomRange = require('../../../global-functions/RandomRange')
let mongoose = require('mongoose')

module.exports = async function GetUpdatedELO(self, match, round){

  //Set up a template for a new leaderboard entry in case one of the players is new
  let leaderBoardData = {
    elo: 1000,
    league: 'unranked',
    og: true,
    matchesPlayed: 0,
  }

  //get the current Leaderboard ranking for each player
  let leaderboardEntries = await Promise.all([
    self.db.schemas.Leaderboard.findOne({user: match.playerOne._id}).lean(),
    self.db.schemas.Leaderboard.findOne({user: match.playerTwo._id}).lean()
  ])

  let p1LeaderboardEntry = leaderboardEntries[0]
  let p2LeaderboardEntry = leaderboardEntries[1]

  //fill in the template data if we cannot find a leaderboard entry for a user
  if(p1LeaderboardEntry === null) p1LeaderboardEntry = {...leaderBoardData, user: match.playerOne._id}
  if(p2LeaderboardEntry === null) p2LeaderboardEntry = {...leaderBoardData, user: match.playerTwo._id}

  //Calculate the new ELO's for each player
  let newELO = CalculateELOChange(p1LeaderboardEntry.elo, p2LeaderboardEntry.elo, Math.abs(round), p1LeaderboardEntry.matchesPlayed, p2LeaderboardEntry.matchesPlayed)

  p1LeaderboardEntry.elo = newELO.p1
  p2LeaderboardEntry.elo = newELO.p2

  p1LeaderboardEntry.matchesPlayed += 1
  p2LeaderboardEntry.matchesPlayed += 1

  //Determine the new leagues for the players after their ELO is changed
  results = await Promise.all([
    DetermineLeague(self, p1LeaderboardEntry),
    DetermineLeague(self, p2LeaderboardEntry)
  ])

  console.log("winner is", Math.abs(round), "p1", results[0], "p2", results[1])

  return results
}

function ChooseKFactorFromMatchesPlayed(matchesPlayed){
  if(matchesPlayed < 10) return 64
  else if(matchesPlayed >= 10 <= 50) return 32
  else if(matchesPlayed > 50) return 24
}

async function DetermineLeague(self, entry){
  let leagueType, elo = entry.elo
  if(entry.matchesPlayed < 10)       leagueType = 'unranked'
  else if(elo <= 500)                 leagueType = 'bronze-1'
  else if(elo >= 501 && elo <= 1000)  leagueType = 'bronze-2'
  else if(elo >= 1001 && elo <= 1500) leagueType = 'bronze-3'

  else if(elo >= 1501 && elo <= 2000) leagueType = 'silver-1'
  else if(elo >= 2001 && elo <= 2500) leagueType = 'silver-2'
  else if(elo >= 2501 && elo <= 3000) leagueType = 'silver-3'

  else if(elo >= 3001 && elo <= 3500) leagueType = 'gold-1'
  else if(elo >= 3501 && elo <= 4000) leagueType = 'gold-2'
  else if(elo >= 4001 && elo <= 4500) leagueType = 'gold-3'

  let leagues = await self.db.schemas.League.find({level: leagueType}).exec()
  let selectedLeague = null
  for(let i = 0; i < leagues.length; i++){
    let league = leagues[i]
    if(leagues[i].botCount > 0){
      selectedLeague = leagues[i]
      break
    }
  }

  if(leagueType === 'unranked'){
    let newEntry = {...entry, league: "unranked"}
    return await self.db.schemas.Leaderboard.findOneAndUpdate({user: entry.user}, {...entry, league: "unranked"}, {upsert: true, new: true})
  }

  if(selectedLeague !== null){
    let count = selectedLeague.count + 1,
        botCount = selectedLeague.botCount - 1

    let queries = await Promise.all([
      //add player entry
      self.db.schemas.Leaderboard.findOneAndUpdate({user: entry.user}, {...entry, league: selectedLeague._id}, {upsert: true, new: true}),

      //remove bot entry associated with this league that has the highest elo
      self.db.schemas.Leaderboard.findOneAndUpdate({
        query: {league: selectedLeague._id, og:false},
        sort: {elo: -1},
        remove: true
      }),

      //lower bot count and increase count for league
      self.db.schemas.League.findOneAndUpdate({_id: selectedLeague._id}, {count, botCount})
    ])

    return queries[0]
  }else{
    let bots = [], level

    switch(leagueType){
      case 'bronze-1': level = 0; break
      case 'bronze-2': level = 1; break
      case 'bronze-3': level = 2; break
      case 'silver-1': level = 3; break
      case 'silver-2': level = 4; break
      case 'silver-3': level = 5; break
      case 'gold-1': level = 6; break
      case 'gold-2': level = 7; break
      case 'gold-3': level = 8; break
      case 'master': level = 9; break
    }

    let newLeague = new self.db.schemas.League({level: leagueType, count: 1, botCount: 99})

    for(let i = 0; i < 99; i++){
      let timestamp = new Date()
      timestamp = timestamp.getTime()

      bots.push({
        elo: RandomRange(level*500, (level+1)*500),
        league: newLeague._id,
        timestamp,
        og: false,
      })
    }

    let queries = await Promise.all([
      self.db.schemas.Leaderboard.findOneAndUpdate({user: entry.user}, {...entry, league: newLeague._id}, {upsert: true, new: true}),
      self.db.schemas.Leaderboard.insertMany(bots),
      newLeague = await newLeague.save()
    ])

    return queries[0]
  }
}

// self.db.schemas.Leaderboard.findOneAndUpdate({user: match.playerTwo._id}, p2LeaderboardEntry, {upsert: true}),

function CalculateELOChange(p1ELO, p2ELO, winner, p1MatchesPlayed, p2MatchesPlayed){
  // p1Rating = Math.pow(10, p1ELO/400)
  // p2Rating = Math.pow(10, p2ELO/400)
  p1Expected = p1ELO/(p1ELO + p2ELO)
  p2Expected = p2ELO/(p1ELO + p2ELO)
  p1Score = winner === 1 ? 1 : (winner === 2 ? 0 : 0.5)
  p2Score = winner === 1 ? 0 : (winner === 2 ? 1 : 0.5)
  p1K = ChooseKFactorFromMatchesPlayed(p1MatchesPlayed)
  p2K = ChooseKFactorFromMatchesPlayed(p2MatchesPlayed)
  let p1NewELO = p1ELO + p1K * (p1Score-p1Expected)
  let p2NewELO = p2ELO + p2K * (p2Score-p2Expected)
  return {
    p1: p1NewELO,
    p2: p2NewELO
  }
}
