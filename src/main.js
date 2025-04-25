const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const path = require('path')

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3030

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('sendMessage', (message) => {
      io.emit('receiveMessage', message);
      console.log(`Message sent: ${message}`);
  });

  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
