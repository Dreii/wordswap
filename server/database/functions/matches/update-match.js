module.exports = (self) => async function(matchID, update, socket){
  let match = await self.schemas.Match.findOneAndUpdate(
    {_id: matchID},
    {$set: { ...update }},
    {new: true}
  )
  .populate('playerOne')
  .populate('playerTwo')

  socket.emit('mu', match)
  return match
}
