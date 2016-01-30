var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = 4242;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var sockets    = [];
var numPlayers = 0;
var maxPlayers = 1;
var numGames   = 1;
var currentMiniGame = 0;
var players = [];

var Player = require('./sPlayer');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

io.on('connection', function(socket) {

  function startGame() {
    console.log('startMiniGame ' + currentMiniGame);
    io.emit('startMiniGame', currentMiniGame);
    for (s in sockets) s.lastResult = null;
    //setTimeout(endGame, 5000);
  }
  function endGame() {
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
      currentMiniGame = (currentMiniGame+1)%numGames;
      setTimeout(startGame, 1000);
    }
  });

  socket.on('userConnected', function(data) {
    if (numPlayers > maxPlayers) return;

    socket.playerNum = numPlayers;
    socket.username  = data.username;
    data.id = socket.playerNum;
    var player = new Player(data);
    socket.player = player;
    players.push(player);
    console.log(socket.username + '(' + socket.playerNum +') connected to server!');
    //console.log(data. + '(' + socket.playerNum +') connected to server!');
    ++numPlayers;
    sockets += socket;
    io.emit('newPlayerConnected', socket.username);
    socket.emit('connectionACK', socket.playerNum);
    console.log('a user has connected!');
    if (numPlayers === maxPlayers) {
      io.emit('allPlayersConnected', players);
      setTimeout(startGame, 4000);
    }
  });
  
  socket.on('tamagotchiFinished', function(timeSpent) {
    if (currentMiniGame == 0) {
      socket.player.score += 10;
      io.emit('minigameFinished', players, socket.playerNum);
      currentMiniGame = (currentMiniGame + 1)%numGames;
      ++currentMiniGame;
      setTimeout(startGame, 4000);
    }
  });

  socket.on('disconnect', function(){
    if (socket in sockets) {
      io.emit('userDisconnected', socket.username);
      --numPlayers;
      players.slice[socket.playerNum, socket.playerNum+1];
      sockets.slice[socket.playerNum, socket.playerNum+1];
    }
    io.emit('goToWaitRoom');
  }); 
});

http.listen(PORT, function(){
  console.log('listening on *:'  + PORT);
});
