const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.get('/', function(req, res) {
    res.render('index.ejs');
});

var clientInfo = {};

function sendCurrentUsers(socket) { // loading current users
  var info = clientInfo[socket.id];
  var users = [];
  if (typeof info === 'undefined') {
    return;
  }

 Object.keys(clientInfo).forEach(function(socketId) {
    var userinfo = clientInfo[socketId];
    // check if user room and selcted room same or not
    // as user should see names in only his chat room
    if (info.room == userinfo.room) {
      users.push(userinfo.name);
    }

  });

 socket.emit("message", {
    name: "System",
    text: "Current Users : " + users.join(', '),
    timestamp: moment().valueOf()
  });

}


io.sockets.on('connection', function(socket) {
 console.log("User is connected");
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
var userdata = clientInfo[socket.id];
 if (typeof(userdata !== undefined)) {
      socket.leave(userdata.room); // leave the room
      //broadcast leave room to only memebers of same room
      socket.broadcast.to(userdata.room).emit("message", {
        text: userdata.name + " has left",
        name: "System",
        timestamp: moment().valueOf()
      });

      // delete user data-
      delete clientInfo[socket.id];

    }
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    });

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

  socket.on('joinRoom', function(req) {
    clientInfo[socket.id] = req;
    socket.join(req.room);
    //broadcast new user joined room
    socket.broadcast.to(req.room).emit("message", {
      name: "System",
      text: req.name + ' has joined',
      timestamp: moment().valueOf()
    });

  });
 socket.on('typing', function(message) { // broadcast this message to all users in that room
    socket.broadcast.to(clientInfo[socket.id].room).emit("typing", message);
  });

  // to check if user seen Message
  socket.on("userSeen", function(msg) {
    socket.broadcast.to(clientInfo[socket.id].room).emit("userSeen", msg);
    //socket.emit("message", msg);

  });

  socket.emit("message", {
    text: "Welcome to Chat Appliction !",
    
    name: "System"
  });


});



const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});