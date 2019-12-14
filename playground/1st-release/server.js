import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const socketserver = socketio(server)

app.use(express.static('public'))

const game = createGame()
// game.addPlayer({playerId: 'player1', playerX: 2, playerY: 2})
// game.addPlayer({playerId: 'player2', playerX: 5, playerY: 9})
// game.addPlayer({playerId: 'player3', playerX: 3, playerY: 5})
// game.addFruit({fruitId: 'fruit1', fruitX: 3, fruitY: 3})
// game.addFruit({fruitId: 'fruit2', fruitX: 6, fruitY: 6})
// game.movePlayer({playerId: 'player1', keyPressed: 'ArrowRight'})

console.log(game.state)

socketserver.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player connected on Server with id: ${playerId}`)

    // game.addPlayer({playerId, playerX: 0, playerY: 0})

    socket.emit('setup', game.state)
})

server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`)
})