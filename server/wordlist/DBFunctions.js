const DBFunctions = {
  get: (db, sql) => new Promise(function(resolve, reject){
    db.get(sql, [], (err, rows)=>{
      if(err) return reject(err)
      else return resolve(rows)
    })
  }),
  all: (db, sql) => new Promise(function(resolve, reject){
    db.all(sql, [], (err, rows)=>{
      if(err) return reject(err)
      else return resolve(rows)
    })
  }),
  check: (db, word) => new Promise(function(resolve, reject){
    db.get(`
      SELECT * FROM words WHERE word='${word.toLowerCase()}';
    `, [], (err, rows)=>{
      if(err) {
        console.log(err)
        return reject(err)
      }
      else return resolve(rows)
    })
  })
}


module.exports = DBFunctions
