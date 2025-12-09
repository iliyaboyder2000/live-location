const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname)));

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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 سرور اجرا شد: http://localhost:${PORT}`);
});