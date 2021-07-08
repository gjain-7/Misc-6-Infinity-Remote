const express = require('express')
const { SocketAddress } = require('net')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server,{
  cors: {
    origin: "*"
  }
}) 

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index'/*,{ rooms: rooms } */ ) //scanner nishit 
})

app.post('/mainpage', (req,res) => {
  res.render('mainpage',{roomName: req.body.room})   // where "room" is the name of the roomName acquried from the qr-code scanner(nishit's)
  console.log("redirecting user to mainpage.html ...")
})

server.listen(3000)

io.on('connection', socket => {
  console.log(socket.id)

  socket.on('new-pwa-user', room => { // joining popup
    let roomie = io.sockets.adapter.rooms.get(room)
    console.log(roomie," ",roomie.size)
    if (roomie.size < 2){  
      socket.join(room)
      console.log("new pwa user joined in",room)
    }
  })

  socket.on('popupmessage', (message,room) => { // listening popup and sending content
    console.log("pwa: ",message)
    console.log(socket.id," room: ",socket.rooms)
    let roomie = io.sockets.adapter.rooms.get(room)
    if (roomie.has(socket.id)){
      socket.to(room).emit('popupmessage', message )
    }
  })

  socket.on('contentmessage', message => { // listening content and sending popup
    console.log("extension: ",message)
    console.log(socket.id," room: ",socket.rooms)
    io.in(socket.id).emit('contentmessage', message )
  })

  socket.on('disconnect', () => {
    console.log(socket.id, "left")
  })
})
