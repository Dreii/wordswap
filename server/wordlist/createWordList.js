const request = require('./DBFunctions')
const sqlite3 = require('sqlite3').verbose()

module.exports = () => {
  let db = new sqlite3.Database('./server/wordlist/words.db', (err, msg)=>{
    if(err){
      return console.log(err.message);
    }

    console.log("should be creating", msg)

    let sql = `CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT UNIQUE NOT NULL,
        firstletter TEXT NOT NULL,
        lastletter TEXT NOT NULL,
        length NUMBER
      )`

    db.get(sql, (err, row)=>{
      if(err) return console.log(err.message);
      console.log("wordlist connection successful");
    })
  })

  require('./read-data-from-files')()
  .then((lists)=>{
    lists.forEach(list => {
      list.forEach(word => {
        let sql = `
          INSERT INTO words (word, firstLetter, lastLetter, length)
          VALUES (
            "${word}",
            "${word.charAt(0)}",
            "${word.charAt(word.length-1)}",
            "${word.length}"
          )
        `

        db.get(sql, (err, row)=>{
          if(err) return console.log(err.message);
          else{
            console.log(word)
          }
        })
      })
    })
  })
  return db
}
