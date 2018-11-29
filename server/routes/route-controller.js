module.exports = (app)=>{
  require('./routes/login')(app)
  require('./routes/fb-login')(app)
  require('./routes/signup')(app)
  require('./routes/edit-user')(app)
  require('./routes/submit-username')(app)

  require('./routes/purchase-item')(app)

  require('./routes/check-word')(app)
}
