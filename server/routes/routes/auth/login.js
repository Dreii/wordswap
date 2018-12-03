module.exports = (app) => {
  app.post("/login", (req, res) => {
    console.log(req.body)
    return app.db.functions.verify(req.body.username)
    .then(user => {
      if(user) return app.db.functions.authenticate(user, req.body.password)
      else throw new Error("A user with that username doesn't exist.")
    })
    .then(user => {
      if(user){
        var token = app.jwt.sign({ id: user._id }, app.config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.json({message: "success", token, data: user})
      }
      else{
        throw new Error("No user found with that username and password.")
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(401).json({ error: error.message })
    })
  })
}
