const express = require('express');
const { createServer } = require('node:http');
const dotenv = require("dotenv").config()
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const PORT = process.env.PORT;
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'src', 'index.html'));
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});