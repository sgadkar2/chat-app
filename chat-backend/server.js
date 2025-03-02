const express = require('express');
const http = require("http");
const {Server} = require('socket.io')

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['Get', 'Post']
    }
});

io.on('connection', (socket) => {
    console.log("User is connected at: ",socket.id);

    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(4000, () => {
    console.log('Server listening on port 4000');
});
