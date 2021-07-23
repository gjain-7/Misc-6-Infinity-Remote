console.log("background initiated");
const socket = io("http://localhost:3000");
socket.on("connect", function () {
  console.log("content initiated",socket.id);
  chrome.storage.local.set({ roomName: socket.id });
});

function apply(message) {
  let params = {
    active: true,
    currentWindow: true,
  };
  chrome.tabs.query(params, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
  socket.emit("contentmessage", message);
  console.log(message);
});

socket.on("popupmessage", (message) => {
  apply(message);
});