module.exports = (app)=>{
  require('./routes/auth/login')(app)
  require('./routes/auth/fb-login')(app)
  require('./routes/auth/signup')(app)
  require('./routes/auth/submit-username')(app)

  require('./routes/edit-user')(app)
  require('./routes/purchase-item')(app)

  require('./routes/check-word')(app)
}
