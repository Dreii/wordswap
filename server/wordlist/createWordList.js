const request = require('../../functions/DBFunctions')
const sqlite3 = require('sqlite3').verbose()

module.exports = () => {
  let db = new sqlite3.Database('./words.db', (err)=>{
    if(err){
      return console.log(err.message);
    }

    let sql = `CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT UNIQUE NOT NULL,
        firstletter TEXT NOT NULL,
        lastletter TEXT NOT NULL,
        length NUMBER
      )`

    db.get(sql, (err, row)=>{
      if(err) return console.log(err.message);
    })
    console.log("connection successful");

  })


  return db
}
