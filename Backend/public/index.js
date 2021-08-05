const qrcode1 = window.qrcode;
const btn = document.querySelector("button");
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
const form = document.querySelector("form");
let scanning = false;

openScan();
qrcode1.callback = (res) => {
  if (res) {
    sendData(res);
    console.log(res);
    scanning = false;
    video.srcObject.getTracks().forEach((track) => {
      track.stop();
    });
    canvasElement.hidden = true;
  }
};

function openScan() {
  document.body.style.backgroundColor = "dodgerblue";
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      scanning = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    })
    .catch((error) => {
      alert(error);
    });
}

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode1.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}

function sendData(data) {
  console.log(data);
  form.querySelector("input").value = data;
  form.submit();
}
