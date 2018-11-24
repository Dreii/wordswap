module.exports = (app, port) => {
  app.io.listen(port)
  console.log("Socket listening on port", port);
  app.io.on('connection', function(socket){
    socket.emit('hello', {hello: 'world'})
    socket.on('update', function(data){
      console.log(data);
    })
  })
}
