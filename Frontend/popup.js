// console.log("Hi this is popup.js")
// function createqr(info) {
//   var qr = new QRious({
//     element: document.getElementById("qr-code"),
//     size: 250,
//     value: info,
//   });
// }
// // createqr("http://localhost:5500/extensionss/mainpage.html");

// chrome.runtime.onMessage.addListener(gotMessage);
// function gotMessage(message, sender, sendResponse) {
//   console.log(message);
// }

// function updatePopup() {
//   chrome.storage.local.get(['roomName'], function (data) {
//       createqr(data.roomName)
//   })
// }

// updatePopup()

console.log("Popup clicked")
function createqr(info) {
  var qr = new QRious({
    element: document.getElementById("qr-code"),
    size: 250,
    value: info,
  });
}

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
var instruction = document.querySelector("p").innerHTML
document.querySelector("a").onclick(function(){
  instruction = "Scan this QR-Code with a <a></a> camera";
  createqr("something");
  document.querySelector("button").style.display="block"
})

document.querySelector("button").onclick(function(){
  instruction= "Scan this QR-code with the <a>Infinity Remote </a>website."
  updatePopup();
})