const compression = require('compression');
const express = require("express");
const { SocketAddress } = require("net");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ["https://infinity-remote.herokuapp.com/*","http://infinity-remote.herokuapp.com/*"],
  },
});

const path =__dirname;
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(compression());
app.use(express.static(path));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https')
    res.redirect(`https://${req.header('host')}${req.url}`)
  else
    next()
})

app.get("/", (req, res) => {
  res.render("welcome");
});
app.get("/qr-scanner", (req, res) => {
  res.render("index");
});

app.get("/invalid", (req, res) => {
  res.render("invalid");
});

app.get("/error", (req, res) => {
  res.render("error");
});
app.get("/connecting", (req, res) => {
  res.render("geterror");
});
app.get("/mainpage", (req, res) => {
  res.render("geterror");
});

app.get("/sitemap.xml", (req, res) =>{
  res.contentType("application/xml")
  res.sendFile("/sitemap.xml")
})

app.post("/connecting", (req, res) => {
  res.render("connecting", {roomName: req.body.room});
});

app.post("/mainpage", (req, res) => {
  res.render("mainpage", {roomName: req.body.room}); // where "room" is the name of the roomName acquired from the qr-code scanner
  console.log("redirecting user to mainpage.html ...");
});
app.all("*", function (req, res) {
  res.redirect("https://infinity-remote.herokuapp.com");
});
server.listen(process.env.PORT || 3000);

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("new-pwa-user", (room) => {
    // joining popup
    console.log(socket.id);
    let roomie = io.sockets.adapter.rooms.get(room);
    if (roomie){
      console.log(roomie, " ", roomie.size);
      if (roomie.size < 2) {
        socket.join(room);
        console.log("new pwa user joined in", room);
        io.in(socket.id).emit("Connection Established");
      }
      else{
        io.in(socket.id).emit("Connection Ignored");
      }
    }
    else{
      io.in(socket.id).emit("Connection Error");
    }
  });

  socket.on("popupmessage", (message, room) => {
    // listening to popup and sending to content
    console.log("pwa: ", message);
    console.log(socket.id, " room: ", socket.rooms);
    let roomie = io.sockets.adapter.rooms.get(room);
    if (roomie && roomie.has(socket.id)) {
      io.in(room).emit("popupmessage", message);
    }
  });

  socket.on("contentmessage", (message) => {
    // listening to content and sending to popup
    console.log("extension: ", message);
    console.log(socket.id, " room: ", socket.rooms);
    io.in(socket.id).emit("contentmessage", message);
  });

  socket.on("disconnect", () => {
    console.log(socket.id, "left");
  });
});
