module.exports = (self) => async function(matchID, update){
  let match = await self.schemas.Match.findOneAndUpdate(
    {_id: matchID},
    {$set: { ...update }},
    {new: true}
  )
  .populate('playerOne')
  .populate('playerTwo')
  return match
}
