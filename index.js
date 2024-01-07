const express = require('express');
const { createServer } = require('node:http');
const dotenv = require("dotenv").config()
const { join } = require('node:path');

const app = express();
const server = createServer(app);
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'src', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});