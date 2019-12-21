import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const socketserver = socketio(server)

app.use(express.static('public'))

const game = createGame()
game.start()

game.subscribe((command) => {
    console.log(`> Emitting : ${command.type}`)
    socketserver.emit(command.type, command)
})

socketserver.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player connected: ${playerId}`)

    game.addPlayer({playerId})

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        console.log(`> Player disconnected: ${playerId}`)
        game.removePlayer({playerId: playerId})
    })

    socket.on('move-player', (command) => {
        command.playerId = playerId
        command.type = 'move-player'

        game.movePlayer(command)
    })
})

server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`)
})