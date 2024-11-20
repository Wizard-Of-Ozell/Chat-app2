const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve static files from 'public' folder

// Handle connection of clients
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming chat messages
  socket.on('chatMessage', (data) => {
    console.log(`${data.username}: ${data.message}`);
    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});