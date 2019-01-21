let RandomRange = require('./RandomRange')

/**
 * Setup leaderboard to have starting data
 * @param db The database to setup a leaderboard on
 */
module.exports = async function(db){
  //check for leagues in each category needed, if any league has under 100 add until there is 100
  let Leagues = [
    db.schemas.League.findOneAndUpdate({level: 'bronze-1'}, {$setOnInsert: {level: 'bronze-1', count: 0, botCount: 0}}, {upsert: true, new: true}).lean().exec(),
    db.schemas.League.findOneAndUpdate({level: 'bronze-2'}, {$setOnInsert: {level: 'bronze-2', count: 0, botCount: 0}}, {upsert: true, new: true}).lean().exec(),
    db.schemas.League.findOneAndUpdate({level: 'bronze-3'}, {$setOnInsert: {level: 'bronze-3', count: 0, botCount: 0}}, {upsert: true, new: true}).lean().exec(),

    db.schemas.League.findOneAndUpdate({level: 'silver-1'}, {$setOnInsert: {level: 'silver-1', count: 0, botCount: 0}}, {upsert: true, new: true}).lean().exec(),
    db.schemas.League.findOneAndUpdate({level: 'silver-2'}, {$setOnInsert: {level: 'silver-2', count: 0, botCount: 0}}, {upsert: true, new: true}).lean().exec(),
    db.schemas.League.findOneAndUpdate({level: 'silver-3'}, {$setOnInsert: {level: 'silver-3', count: 0, botCount: 0}}, {upsert: true, new: true}).lean().exec(),

    db.schemas.League.findOneAndUpdate({level: 'gold-1'},   {$setOnInsert: {level: 'gold-1', count: 0, botCount: 0}}, {upsert: true, new: true}).lean().exec(),
    db.schemas.League.findOneAndUpdate({level: 'gold-2'},   {$setOnInsert: {level: 'gold-2', count: 0, botCount: 0}}, {upsert: true, new: true}).lean().exec(),
    db.schemas.League.findOneAndUpdate({level: 'gold-3'},   {$setOnInsert: {level: 'gold-3', count: 0, botCount: 0}}, {upsert: true, new: true}).lean().exec(),

    db.schemas.League.findOneAndUpdate({level: 'master'},   {$setOnInsert: {level: 'master', count: 0, botCount: 0}}, {upsert: true, new: true}).lean().exec(),
  ]

  Leagues = await Promise.all(Leagues)

  let newEntries = []
  Leagues.map((league, i) => {
    if(league.count+league.botCount < 100){
      console.log(league.botCount, 100-league.botCount)
      let currentCount = league.count + league.botCount
      for(let j = 0; j < 100 - (league.count + league.botCount); j++){
        newEntries.push(GenerateLeaderboardUser(league._id, i))
        currentCount ++
      }

      newObj = {...league, botCount: currentCount}
      console.log(newObj)
      return db.schemas.League.findOneAndUpdate({_id: league._id}, {$set:newObj}).exec()
    }
  })

  console.log(newEntries)

  // console.log(Leagues)
  let ret = await Promise.all([Leagues, db.schemas.Leaderboard.insertMany(newEntries)])
  // console.log(ret)
  return ret
}


function GenerateLeaderboardUser(leagueID, level){
  // console.log(level)
  // switch(level){
  //   case 0: level = 'bronze-1'; break;
  //   case 1: level = 'bronze-2'; break;
  //   case 2: level = 'bronze-3'; break;
  //   case 3: level = 'silver-1'; break;
  //   case 4: level = 'silver-2'; break;
  //   case 5: level = 'silver-3'; break;
  //   case 6: level = 'gold-1'; break;
  //   case 7: level = 'gold-2'; break;
  //   case 8: level = 'gold-3'; break;
  //   case 9: level = 'master'; break;
  // }

  let timestamp = new Date()
  timestamp = timestamp.getTime()

  let data = {
    elo: RandomRange(level*500, (level+1)*500),
    league: leagueID,
    timestamp,
    og: false,
  }

  // console.log(data)
  return data
}
