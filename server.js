const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('.'));

const server = http.createServer(app);
const io = new Server(server);

let locations = {};

io.on('connection', (socket) => {
  console.log('🔗 کاربر وصل شد:', socket.id);

  socket.on('location', (data) => {
    locations[data.userId] = data;
    console.log('📍 موقعیت:', data);
    io.emit('update', data);
  });

  socket.on('disconnect', () => {
    console.log('❌ کاربر قطع شد:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('🚀 سرور اجرا شد: http://localhost:3000');
});