const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
var spawn = require("child_process").spawn

app.use(express.static(__dirname));

app.use(function (req, res, next) {
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});


let wynik

  var process = spawn('python',["-u","./test.py"])
  process.stdout.on('data', function(data){
    wynik = data.toString().trim();
    console.log("Parsed data:", wynik);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let interval;

io.on('connection', (socket) => {
  console.log('Nowe połączenie klienta');

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => emitTime(socket), 100);

  socket.on('disconnect', () => {
    console.log('Klient rozłączony');
    clearInterval(interval);
  });
});

function emitTime(socket) {

    socket.emit('update', wynik);



}

server.listen(3000, () => {
  console.log('Serwer działa na http://localhost:3000');
});