module.exports = (app) => {
  app.post("/signup", (req, res) => {
    console.log(req.body)
    return app.db.functions.verify(req.body.username)
    .then(user => {
      if(user){
        throw new Error("User already exists.")
      }else{
        return app.db.functions.createUser({
          username: req.body.username,
          password: app.bcrypt.hashSync(req.body.password, 8),
        })
      }
    })
    .then((user) => {
      var token = app.jwt.sign({ id: user._id, username: user.username, password: user.password }, app.config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.json({message: "success", token, data: user})
    })
    .catch((error) => {
      res.status(401).json({ error: error.message })
    });
  })
}
