let mongoose = require('mongoose')

/**
 * Setup leaderboard to have starting data
 * @param db The database to setup a leaderboard on
 */

module.exports = async function(db){
  let Leaderboard = await db.schemas.Leaderboard.findOne({})
  if(Leaderboard === null) Leaderboard = {
    region: 'NA',
    BronzeLeague: [],
    SilverLeague: [],
    GoldLeague:   [],
    MasterLeague: []
  }

  console.log("this many should be left", 300-Leaderboard.BronzeLeague.length)
  for(let i = 0; i < 300-Leaderboard.BronzeLeague.length; i++){
    Leaderboard.BronzeLeague.push(GenerateLeaderboardUser(1))
  }

  console.log("this many should be left", 300-Leaderboard.SilverLeague.length)
  for(let i = 0; i < 300-Leaderboard.SilverLeague.length; i++){

    Leaderboard.SilverLeague.push(GenerateLeaderboardUser(2))
  }

  console.log("this many should be left", 300-Leaderboard.GoldLeague.length)
  for(let i = 0; i < 300-Leaderboard.GoldLeague.length; i++){

    Leaderboard.GoldLeague.push(GenerateLeaderboardUser(3))
  }

  // console.log("post league insert")
  // await Promise.all(leagues)
  // console.log(Leaderboard)
  await db.schemas.Leaderboard.findOneAndUpdate({region: 'NA'}, Leaderboard, {upsert: true})
}


function GenerateLeaderboardUser(level){
  let data = {
    elo: level === 1 ? (/*1*/randomRange(0,1500)):(level === 2 ? (/*2*/randomRange(1501,3000)):(/*3*/randomRange(3001,4500))),
    og: false
  }

  // console.log(data)
  return data
}


function randomRange(min, max){
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
