const randomLetter = () => {
  let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  return letters[Math.round(Math.random()*(letters.length-1))]
}

const randomLetterScores = () => {
  let points = []

  for(let i = 0; i < 4; i++){

    let letter = randomLetter()
    while(points.find(point => point.letter == letter)){
      letter = randomLetter()
    }

    points.push({
      letter: letter,
      score: Math.round(Math.random()*2)+1
    })
  }

  return points
}

module.exports = randomLetterScores
