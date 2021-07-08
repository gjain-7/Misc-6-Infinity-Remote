const express = require('express')
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

// const rooms = { }

app.get('/', (req, res) => {
  res.render('index'/*,{ rooms: rooms } */ ) //scanner nishit 
})

// app.post('/room', (req, res) => { 
//   // extension socket id is stored here and will be used later on ...
//   if (rooms[req.body.room] != null) {
//     return res.redirect('/')
//   }
//   rooms[req.body.room] = { users: {} }
//   res.redirect(req.body.room )  //redirected to idName
//   // Send message that new room was created
//   io.emit('room-created', req.body.room)
// })

// app.get('/:room', (req, res) => {
//   if (rooms[req.params.room] == null) {
//     return res.redirect('/')
//   }
//   res.render('room', { roomName: req.params.room }) //render mainpage.html with id as parameter 
// })

app.post('/mainpage', (req,res) => {
  res.render('mainpage',{roomName: req.body.room})   // where "room" is the name of the roomName acquried from the qr-code scanner(nishit's)
  console.log("redirecting user to mainpage.html ...")
})

server.listen(3000)

io.on('connection', socket => {
  console.log(socket.id)
  // socket.on('new-user', (room, name) => {
  //  // room = allotRoomName()
  //   socket.join(room)
  //   rooms[room].users[socket.id] = name
  //   socket.to(room).broadcast.emit('user-connected', name)
  // })

  socket.on('new-pwa-user', room => { // joining popup
    socket.join(room)
    console.log("new pwa user joined in",room)
  })

  socket.on('popupmessage', (message,room) => { // listening popup and sending content
    console.log("pwa: ",message)
    console.log(socket.id," room: ",socket.rooms)
    socket.to(room).emit('popupmessage', message )
  })

  socket.on('contentmessage', message => { // listening content and sending popup
    console.log("extension: ",message)
    console.log(socket.id," room: ",socket.rooms)
    io.in(socket.id).emit('contentmessage', message )
  })

  // socket.on('send-chat-message', (room, message) => {
  //   socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] })
  // })

  socket.on('disconnect', () => {
    console.log(socket.id, "left")
  //  getUserRooms(socket).forEach(room => {
//       socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id])
  //     delete rooms[room].users[socket.id]
  //   })
  })
})

// const  roomNames = []
// function allotRoomName(){
//   let i=0
//   for(i=0;i<roomNames.length;i++){
//     if(roomNames[i]== false) { // true means occupied
//       roomNames[i]=true;
//       return hashGenerator(i); 
//     }
//   }
//   roomNames.push(true);
//   return hashGenerator(i);
// }

// function getUserRooms(socket) {
//   return Object.entries(rooms).reduce((names, [name, room]) => {
//     if (room.users[socket.id] != null) names.push(name)
//     return names
//   }, [])
// }

// function hashGenerator(i){
//   // insert here
//   return i.toString();
// }