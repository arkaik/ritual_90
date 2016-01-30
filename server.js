var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = 4242;

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var sockets    = [];
var numPlayers = 0;
var maxPlayers = 4;
var numGames   = 1;
var currentMiniGame = 0;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

io.on('connection', function(socket) {

  function startGame() {
    console.log('startMiniGame ' + currentMiniGame);
    io.emit('startMiniGame', currentMiniGame);
    for (s in sockets) s.lastResult = null;
    setTimeOut(endGame, 5000);
  }
  function endgame() {
    console.log('finishMiniGame');
    io.emit('finishMiniGame');
  }

  socket.on('endOfGame', function(result) {
    console.log('player ' + socket.playerNum + ': endOfGame');
    socket.lastScore = result.score;
    
    if (/*allReceived*/true) {
      // calcular guanyador a partir de les puntiacions rebudes
      var winner = sockets[0];
      var minScore = -1;
      for (s in sockets) {
        if (s.lastScore < minScore) {
          minScore = s.lastScore;
          winner = sockets.playerNum;
        }
      }
      io.emit('sendWinner', winner);
      currentMiniGame++;
      setTimeOut(startGame, 1000);
    }
  });

  socket.on('userConnected', function(username) {
    if (numPlayers > maxPlayers) return;
    socket.playerNum = numPlayers;
    socket.username  = username;
    console.log(socket.username + '(' + socket.playerNum +') connected to server!');
    ++numPlayers;
    sockets += socket;
    io.emit('newPlayerConnected', socket.username);
    socket.emit('connectionACK', socket.playerNum);
    console.log('a user has connected!');
    if (numPlayers == maxPlayers) {
      io.emit('allPlayersConnected');
      setTimeOut(startGame, 1000);
    }
  });
  /*
  socket.on('chatMessage', function(msg){
    if (msg !== '') io.emit('chatMessage', {username: socket.username, msg: msg});
  });
  */
  socket.on('disconnect', function(){
    io.emit('chatMessage', {username: 'System', msg: socket.username + ' has disconnected from the server.'});
  }); 
});

http.listen(PORT, function(){
  console.log('listening on *:'  + PORT);
});
