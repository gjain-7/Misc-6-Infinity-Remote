console.log("Popup clicked");
function createqr(info) {
  var qr = new QRious({
    element: document.getElementById("qr-code"),
    size: 250,
    value: info,
  });
}

function updatePopup() {
  chrome.storage.local.get(["roomName"], function (data) {
    createqr(data.roomName);
  });
}

updatePopup();

var instruction = document.querySelector("p");
document.querySelector("a").addEventListener("click", QRcodeofSite);
function QRcodeofSite() {
  instruction.innerHTML = "Scan this QR-Code with your mobile's<a></a> camera";
  createqr("https://www.something something.herokuapp.com");
  document.querySelector("button").style.visibility = "visible";
}
document.querySelector("button").addEventListener("click",QRcodeofExtension);
function QRcodeofExtension() {
  instruction.innerHTML =
    "Scan this QR-code with the <a>Infinity Remote</a> website.";
    document.querySelector("button").style.visibility= "hidden";
  updatePopup();
  document.querySelector("a").addEventListener("click", QRcodeofSite);
}
