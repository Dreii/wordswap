module.exports = (app) => {
  app.post("/fb-login", (req, res) => {
    app.db.functions.checkFBToken(req.body.accessToken)
    .then(token => {
      if(!token.is_valid) throw new Error("Invalid Token")

      else return app.db.functions.checkFBID(req.body.userID)
    })
    .then(user => {
      if(user){
        return user
      }else{
        return app.db.functions.createUser({
          name: req.body.name,
          email: req.body.email,
          fbUserID: req.body.userID
        })
      }
    })
    .then(user => {
      var token = app.jwt.sign({ id: user._id }, app.config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.json({message: "success", token, data: user})
    })
    .catch((error) => {
      console.log(error)
      res.status(401).json({ error: error.message })
    })
  })
}
