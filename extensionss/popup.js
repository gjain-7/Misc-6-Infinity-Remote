console.log("Hi this is popup.js")
function createqr(info) {
  var qr = new QRious({
    element: document.getElementById("qr-code"),
    size: 180,
    value: info,
  });
}
createqr("http://localhost:5500/extensionss/mainpage.html");

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
  console.log(message);
}

