const io = require('socket.io')(3000,{
    cors: {
      origin: "*"
      /*methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
      */
    }
  })
  console.log("server initiated")
  // const users = {}

  io.on('connection', socket => {
    // socket.on('new-user', name => {
      console.log(socket.id)
      console.log("new connection")
    //   users[socket.id] = name
    //   socket.broadcast.emit('user-connected', name)
    // })
    socket.on('contentmessage', message => {
      console.log(message);
      socket.broadcast.emit('contentmessage', message )
    })
    socket.on('popupmessage', message => {
      console.log(message);
      socket.broadcast.emit('popupmessage', message )
    })
    // socket.on('disconnect', () => {
    //   socket.broadcast.emit('user-disconnected', users[socket.id])
    //   delete users[socket.id]
    // })
  })