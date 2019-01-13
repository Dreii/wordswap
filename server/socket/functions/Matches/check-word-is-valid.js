let wordList = require('../../../wordlist/DBFunctions')

module.exports = async function(self, socket, word, wordlist){
  // console.log("checking word:", word)
  let check = await wordList.check(wordlist, word)

  if(check !== undefined) word = check.word
  else {
    console.log(check)
    word = ''
  }

  console.log("final word", word)
  socket.emit("WORD_VALIDATION_RESPONSE", word)
}
