module.exports = async function AssignRecentOpponents(self, match){
  let p1 = match.playerOne,
      p2 = match.playerTwo,
      p2InP1RecentOpponents = p1.recentOpponents.find(previousOpponent=>p2._id === previousOpponent._id),
      p1InP2RecentOpponents = p2.recentOpponents.find(previousOpponent=>p1._id === previousOpponent._id)

  if(!p2InP1RecentOpponents) p1.recentOpponents.push({_id: p2._id, name: p2.name, username: p2.username})
  if(!p1InP2RecentOpponents) p2.recentOpponents.push({_id: p1._id, name: p1.name, username: p1.username})

  while(p1.recentOpponents.length > 10) p1.recentOpponents.shift()
  while(p2.recentOpponents.length > 10) p2.recentOpponents.shift()

  return Promise.all([
    self.db.schemas.User.findOneAndUpdate({_id: p1._id}, p1),
    self.db.schemas.User.findOneAndUpdate({_id: p2._id}, p2)
  ])
}
