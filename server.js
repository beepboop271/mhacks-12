const http = require("http");
const fs = require("fs");
const mime = require("mime");
const em = require("./app.js");

// event listener

em.on("newData", (ref) => {
  ref.on("value", (snapshot) => {
    database = snapshot.val();
    em.emit("updateData", database);
  });
});

// Send index.html to all requests
function send404(res) {
  res.writeHead(404, {"content-type": "text/plain"});
  res.end("Error 404, file not found");
}

function sendFile(res, filepath, data) {
  res.writeHead(200, {"content-type": mime.getType(filepath)});
  res.end(data);
}

/////////////////
///launching server
///////////////////

const server = http.createServer((req, res) => {
  em.emit("refresh");
  if (req.url == "/") {
    filepath = "./webpage.html";
  } else {
    filepath = "./" + req.url;
  }

  fs.readFile(filepath, (err, data) => {
    if (err) {
      send404(res);
    } else {
      sendFile(res, filepath, data);
    }
  });

});
/////////////////////////////
////////////////////////////
/////////////////////

// Socket.io server listens to our app
const io = require('socket.io').listen(server);

em.on("updateData", (database) => {
  const stringData = JSON.stringify(database);
  io.emit("parsedData", stringData);
});

// Emit welcome message on connection
io.on('connection', (socket) => {
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });
});

server.listen(3000, () => {
  console.log("Running on port 3000");
});
