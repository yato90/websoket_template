const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

//node server.js

const app = express();
app.use(cors());
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = new Map();

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        const { type, nickname, message } = JSON.parse(data);

        if (type === 'join') {
            clients.set(ws, nickname);
            broadcastUsers();
        }

        if (type === 'message') {
            broadcast({ type: 'message', nickname, message });
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
        broadcastUsers();
    });
});

function broadcast(data) {
    clients.forEach((_, client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

function broadcastUsers() {
    broadcast({ type: 'users', users: Array.from(clients.values()) });
}

server.listen(3000, () => console.log('Server started on port 3000'));
