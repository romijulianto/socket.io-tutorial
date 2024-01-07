const express = require('express');
const { createServer } = require('node:http');
const dotenv = require("dotenv").config()
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const PORT = process.env.PORT;
const io = new Server(server, {
    connectionStateRecovery: {}
});

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'src', 'index.html'));
});

io.on('connection', (socket) => {
    io.emit("connected true")
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

io.on('disconnection', (socket) => {
    io.emit("disconnect true")
});


server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});