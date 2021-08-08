const socket = io("https://infinity-remote.herokuapp.com/");
socket.emit("newUser", roomId);

socket.on("connectionEstablished", () => {
  // console.log("Connection Received");
  document.getElementById("room").value = roomId;
  document.getElementById("remote").submit();
});

socket.on("remoteAlreadyConnected", () => {
  // console.log("Connection Ignored");
  document.getElementById("secondConnection").submit();
});

socket.on("invalidQR", () => {
  // console.log("Connection Error");
  document.getElementById("invalidQR").submit();
});
