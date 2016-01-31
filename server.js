var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = 4242;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var rooms = [];  // {id: 'id', players: [p1, p2, ..]}
var socks    = [];
var numPlayers = 0;
var maxPlayers = 2;
var numGames   = 3;
var currentMiniGame = 0;
var players = [];
var playerRoom  = {};
var MAX_PL_PER_ROOM = 2;

var Player = require('./sPlayer');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

io.on('connection', function(socket) {
  //if (numPlayers >= maxPlayers) return;

  function startGame() {
    if (socket.room.players.length == MAX_PL_PER_ROOM) {
      console.log('startMiniGame ' + currentMiniGame);
      io.to(socket.room.id).emit('startMiniGame', socket.room.currentMiniGame);
      for (s in socks) s.lastResult = null;
      //setTimeout(endGame, 5000);
    }
  }
  function endGame() {
    console.log('finishMiniGame');
    io.emit('finishMiniGame');
  }
  function findOrCreateRoom(socket) {
    for (var i = 0; i < rooms.length; ++i) {
      console.log(rooms[i].id + ' ' + rooms[i].players.length);
      if (rooms[i].players.length < MAX_PL_PER_ROOM) return rooms[i]; 
    }
    var newRoom = {id: socket.id, players: [], currentMiniGame: 0};
    rooms.push(newRoom);
    return newRoom;
  }

  socket.on('userConnected', function(data) {
    // if (numPlayers > maxPlayers) return;
    var room = findOrCreateRoom(socket);
    socket.room = room;
    socket.join(room.id);
    console.log('user ' + data.username + ' joined room ' + room.id);

    socket.playerNum = socket.room.players.length;
    socket.username  = data.username;
    data.id = socket.playerNum;
    var player = new Player(data);
    socket.player = player;
    socket.room.players.push(player);
    console.log(socket.username + '(' + socket.playerNum +') connected to server!');
    //console.log(data. + '(' + socket.playerNum +') connected to server!');
    ++numPlayers;
    socks += socket;
    io.to(room.id).emit('newPlayerConnected', socket.username);
    socket.emit('connectionACK', socket.playerNum);
    console.log('a user has connected!');
    if (socket.room.players.length === MAX_PL_PER_ROOM) {
      io.to(room.id).emit('allPlayersConnected', socket.room.players);
      setTimeout(startGame, 4000);
    }
  });
  
  socket.on('tamagotchiFinished', function(timeSpent) {
    if (socket.room.currentMiniGame == 0) {
      socket.player.score += 10;
      io.to(socket.room.id).emit('minigameFinished', socket.room.players, socket.playerNum);
      socket.room.currentMiniGame = (socket.room.currentMiniGame + 1)%numGames;
      setTimeout(startGame, 4000);
    }
  });

  socket.on('pizzaFinished', function() {
    if (socket.room.currentMiniGame == 1) {
      socket.player.score += 10;
      io.to(socket.room.id).emit('minigameFinished', socket.room.players, socket.playerNum);
      socket.room.currentMiniGame = (socket.room.currentMiniGame + 1)%numGames;
      setTimeout(startGame, 4000);
    }
  });

  socket.on('VHSFinished', function() {
    if (socket.room.currentMiniGame == 2) {
      socket.player.score += 15;
      io.to(socket.room.id).emit('minigameFinished', socket.room.players, socket.playerNum);
      socket.room.currentMiniGame = (socket.room.currentMiniGame + 1)%numGames;
      setTimeout(startGame, 4000);
    }
  });

  socket.on('disconnect', function() {
    if (socks.indexOf(socket) != -1) {
      console.log('user disconnected');
      if (socket.room != undefined) {
        io.to(socket.room.id).emit('userDisconnected', socket.username);
        --numPlayers;
        console.log('playerNum:' + socket.playerNum);
        // players.slice[socket.playerNum, socket.playerNum+1];
        socks.slice[socket.playerNum, socket.playerNum+1];
        socket.room.players = [];
        //socks = [];
        currentMiniGame = 0;
        socket.room.currentMiniGame = 0;
        numPlayers = 0;
        var room = socket.room;
        var roomIndex = rooms.indexOf(room);
        console.log('room to delete: ' + roomIndex);
        if (roomIndex != -1) rooms.slice(roomIndex, roomIndex+1);
        console.log('number of rooms: ' + rooms.length);
        for (p in socket.room.players) p.room = undefined;
        io.to(socket.room.id).emit('goToWaitRoom');
        console.log('players len:' + players.length);
        console.log('socks len:' + socks.length);
      }
    }
  }); 
});

http.listen(PORT, function(){
  console.log('listening on *:'  + PORT);
});
