module.exports = (app) => {
  //signup route
  app.post("/signup", (req, res) => {
    return app.db.functions.signup(app.db.authSchema, req.body)
    .then((user)=> {
      let token = createToken(app, user)
      res.append('x-access-token', token)

      let body = req.body
      if(!Array.isArray(body)) body = [body]

      res.json(require('./prepareGraphLikeReturn')(app, body, user))
    })
    .catch((error) => {
      console.log(error);
      res.json({ error: error.toString() });
    })
  })

  //authentication route
  app.post("/auth", (req, res) => {
    return app.db.functions.auth(app.db.authSchema, req.body)
    .then((user)=>{
      let token = createToken(app, user)
      res.append('x-access-token', token)
      let body = req.body
      if(!Array.isArray(body)) body = [body]

      res.json(require('./prepareGraphLikeReturn')(app, body, user))
    })
    .catch((error) => {
      console.log(error);
      res.json({ error: error.toString() });
    });
  });
}


const createToken = (app, user) => {
  return app.jwt.sign({ id: user._id, username: user.username, password: user.password }, app.config.secret, {
    expiresIn: 86400 // expires in 24 hours
  })
}
