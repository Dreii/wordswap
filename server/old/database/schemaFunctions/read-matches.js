module.exports = (Schema, selector, data) => {
  let func =  Schema.findById(selector).populate({
    path: 'matches',
    populate: { path: 'playerOne'},
    // populate: { path: 'playerTwo'}
  })
  .populate({
    path: 'matches',
    populate: {path: 'playerTwo'}
  })
  return func.exec()
}
