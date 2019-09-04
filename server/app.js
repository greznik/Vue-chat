const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log('connected serveros')

  socket.on('createMessage', data => {
    setTimeout(() => {
      socket.emit('newMessage', {
        text: data.text + ' SERVER'
      })
    }, 1000)
  })

  
})

module.exports = {
  app,
  server
}