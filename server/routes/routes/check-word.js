module.exports = (app) => {
  app.post("/check-word", (req, res) => {
    res.json({message: "check word"})
  })
}
