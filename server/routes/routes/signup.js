module.exports = (app) => {
  app.post("/signup", (req, res) => {
    res.json({message: "Signup"})
  })
}
