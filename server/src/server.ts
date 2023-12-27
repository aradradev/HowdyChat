import chalk from 'chalk'
import { log } from 'console'
import express from 'express'
import http from 'http'
import {Server, Socket} from 'socket.io'
import { AuthPayload, Message } from './types'
import cors from 'cors'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(cors({origin: 'http://localhost:5173', credentials: true}))

const PORT = 3000

app.get('/', (_req, res) => {
    res.send('Welcome to the HowdyChat application.')
})

io.on('connection', handleConnection)

function handleConnection(socket: Socket) {
    log(chalk.green('A user connected'))

    socket.on('authenticate', (payload: AuthPayload) => handleAuthentication(socket, payload))
    socket.on('disconnect', () => handleDisconnect(socket))
    socket.on('chat message', (msg: Message) => handleChatMessage(msg))
}

function handleAuthentication(socket: Socket, payload: AuthPayload) {
    log(chalk.yellow(`User authenticated: ${payload.username}`))
    io.emit('userAuthenticated', payload.username)
}

function handleDisconnect(socket: Socket) {
    log(chalk.red('A user disconnected'))
}

function handleChatMessage(msg: Message) {
    io.emit('chat message', msg)
}

server.listen(PORT, () => {
    log(chalk.cyan(`Server is running on http://localhost:${PORT}`))
}).on('error', (err) => {
    console.error(chalk.red(`Error starting the server: ${err.message}`));
    
})
