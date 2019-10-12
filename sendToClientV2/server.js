const http = require('http'),
    fs = require('fs'),
    mime = require("mime");
    // NEVER use a Sync function except at start-up!

// Send index.html to all requests
function send404(res) {
  res.writeHead(404, {"content-type": "text/plain"});
  res.end("Error 404, file not found");
}

function sendFile(res, filepath, data) {
  res.writeHead(200, {"content-type": mime.getType(filepath)});
  res.end(data);
}

///launching server

const server = http.createServer((req, res) => {
  let filepath;
  if (req.url == "/") {
    filepath = "./index.html";
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

// Socket.io server listens to our app
const io = require('socket.io').listen(server);

// Send current time to all connected clients
function sendTime() {
    io.emit("test", "HIHIHI");
}

// Send current time every 10 secs
setInterval(sendTime, 1000);

// Emit welcome message on connection
io.on('connection', (socket) => {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });

    socket.on('client', console.log);
});

server.listen(3000, () => {
  console.log("Running on port 3000");
});
