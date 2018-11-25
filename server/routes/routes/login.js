module.exports = (app) => {
  app.post("/login", (req, res) => {
    res.json({message: "login"})
  })
}
