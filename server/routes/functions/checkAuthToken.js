module.exports = (app, token, disable) => {
  if(disable) return Promise.resolve()

  if (!token) throw new Error('No Token provided.')

  app.jwt.verify(token, app.config.secret, (err, decoded)=>{
    if(decoded){
      return Promise.resolve()
    }

    throw new Error(err)
  })
}
