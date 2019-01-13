module.exports = (app) => {
  app.post("/submit-username", (req, res) => {
    //check if the username is taken
    return app.db.functions.verify(req.body.username)
    .then(user => {
      if(user){
        console.log("username taken")
        throw new Error("That username is already taken.")
      }else{
        //username is not taken then check the token and make sure its legit
        console.log("username not taken")
        return app.jwt.verify(req.body.token, app.config.secret, function(err, decoded){
          if(!err) return new Promise((resolve,reject)=>{
            //if the token is good decode and find the user ID
            console.log("token decoded", decoded)
            resolve(decoded.id)
          })
          else throw err
        })
      }
    })
    .then(userID => {
      return app.db.schemas.User.updateOne({_id: userID}, {username: req.body.username}).exec()
    })
    .then((result)=>{
      console.log(result)
      return app.db.functions.verify(req.body.username)
    })
    .then(user => {
      if(user){
        var token = app.jwt.sign({ id: user._id }, app.config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.json({message: "success", token, data: user})
      }else{
        throw new Error("There was a problem, please try again.")
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(401).json({ error: error.message })
    })
  })
}
