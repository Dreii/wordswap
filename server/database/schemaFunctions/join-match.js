const randomLetter = () => {
  let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  return letters[Math.round(Math.random()*(letters.length-1))]
}

const randomLetterScores = () => {
  let points = []

  for(let i = 0; i < 4; i++){

    let letter = randomLetter()
    while(points.includes(letter)){
      letter = randomLetter()
    }

    points.push({
      letter: letter,
      score: Math.round(Math.random()*2)+1
    })
  }

  return points
}


module.exports = (Schema, identifier, data, populators, app) => {
  return Schema.find({'playerOne': {$ne: identifier}, 'playerTwo': {$exists: false}}).populate('playerOne').exec()
  .then(documents => {
    if(data === undefined || data.rank === undefined) throw new Error("Match Join requires a data object containing the searching players rank")
    if(documents.length > 0 && documents[0]){
      //sort each document by how close in MMR player1 is
      documents.sort((a, b) => Math.abs(a.rank - data.rank) - Math.abs(b.rank - data.rank))
      return Schema.findByIdAndUpdate(documents[0]._id, {playerTwo: identifier}, {new: true, runValidators: true})
      .populate('playerOne')
      .populate('playerTwo')
      .then(assignedMatch => {

        app.io.updateMatch(assignedMatch, 2)

        return app.db.schemas.User.findByIdAndUpdate(identifier, {$push: {matches: assignedMatch._id}}, {new: true, runValidators: true})
        .populate({
          path: 'matches',
          populate: { path: 'playerOne'},
        })
        .populate({
          path: 'matches',
          populate: {path: 'playerTwo'}
        })
      })
    }else{
      //create a new match with player one as selector
      return Schema.create({playerOne: identifier, letterScores: randomLetterScores(), initialRequiredLetter: randomLetter()})
      .then(newMatch => app.db.schemas.User.findByIdAndUpdate(identifier, {$push: {matches: newMatch._id}}, {new: true, runValidators: true})
      .populate({
        path: 'matches',
        populate: { path: 'playerOne'},
      })
      .populate({
        path: 'matches',
        populate: {path: 'playerTwo'}
      }))
    }
  })
}
