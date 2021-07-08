console.log("Hi this is popup.js")
function createqr(info) {
  var qr = new QRious({
    element: document.getElementById("qr-code"),
    size: 250,
    value: info,
  });
}
// createqr("http://localhost:5500/extensionss/mainpage.html");

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
  console.log(message);
}

function updatePopup() {
  chrome.storage.local.get(['roomName'], function (data) {
      createqr(data.roomName)
  })
}

updatePopup()