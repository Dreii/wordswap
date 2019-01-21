module.exports = (self) => async function(data){

  let newUser = new self.schemas.User({
    ...data,
    // trunk: StartingTrunk(),
  })

  let newLeaderboardEntry = new self.schemas.Leaderboard({userID: newUser._id})
  await newLeaderboardEntry.save()

  return newUser.save()
}
