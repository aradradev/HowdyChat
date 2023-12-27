"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const console_1 = require("console");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.use((0, cors_1.default)({ origin: 'http://localhost:5173', credentials: true }));
const PORT = 3000;
app.get('/', (_req, res) => {
    res.send('Welcome to the HowdyChat application.');
});
io.on('connection', handleConnection);
function handleConnection(socket) {
    (0, console_1.log)(chalk_1.default.green('A user connected'));
    socket.on('authenticate', (payload) => handleAuthentication(socket, payload));
    socket.on('disconnect', () => handleDisconnect(socket));
    socket.on('chat message', (msg) => handleChatMessage(msg));
}
function handleAuthentication(socket, payload) {
    (0, console_1.log)(chalk_1.default.yellow(`User authenticated: ${payload.username}`));
    io.emit('userAuthenticated', payload.username);
}
function handleDisconnect(socket) {
    (0, console_1.log)(chalk_1.default.red('A user disconnected'));
}
function handleChatMessage(msg) {
    io.emit('chat message', msg);
}
server.listen(PORT, () => {
    (0, console_1.log)(chalk_1.default.cyan(`Server is running on http://localhost:${PORT}`));
}).on('error', (err) => {
    console.error(chalk_1.default.red(`Error starting the server: ${err.message}`));
});
