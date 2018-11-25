module.exports = (app)=>{
  require('./routes/login')(app)
  require('./routes/signup')(app)

  require('./routes/CheckWord')(app)
}
