module.exports = (self) => async function(matchID, update, receiver){
  let match = await self.schemas.Match.findOneAndUpdate(
    {_id: matchID},
    {$set: { ...update }},
    {new: true}
  )
  .populate('playerOne')
  .populate('playerTwo')

  receiver.emit('MATCH_UPDATED', match)
  return match
}
