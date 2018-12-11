//Initialize server application.
const app = require('./functions/setup-application');

console.log("building..");

//setup Socket.
app.io = require('./socket/socket-controller')
app.io.connect(app.db)

//Setup Routes.
require('./routes/route-controller')(app);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
