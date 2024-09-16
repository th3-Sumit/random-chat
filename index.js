const express = require('express')
const path = require('path')
const app = express()
const ChatData = require('./models/chatList')
const env = require("dotenv")
const PORT = process.env.port || 4000
require('./config/db')
env.config()


const server = app.listen(PORT, () => console.log(`💬 server is running on port ${PORT}`))

const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))

let socketsConected = new Set()

io.on('connection', onConnected)

function onConnected(socket) {
  console.log('Socket connected', socket.id)
  socketsConected.add(socket.id)
  io.emit('clients-total', socketsConected.size)

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id)
    socketsConected.delete(socket.id)
    io.emit('clients-total', socketsConected.size)
  })

  socket.on('message', async(data) => {
    // console.log(data)
    // try{
    //   const chatMessage = new ChatData(data);
    //   await chatMessage.save();
    // }catch(error){
    //   console.log(error)
    // }
    socket.broadcast.emit('chat-message', data)
  })

  socket.on('feedback', (data) => {
    socket.broadcast.emit('feedback', data)
  })
}