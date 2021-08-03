const qrcode1 = window.qrcode;
 
const btn = document.querySelector('button');
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
 
const btnScanQR = document.getElementById("btn-scan-qr");

const form = document.querySelector("form");
 
let scanning = false;
 
openScan();
qrcode1.callback = (res) => {
  if (res) {
    sendData(res);
    console.log(res);
    scanning = false;
 
    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });
 
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
  }
  // window.open(res, '_self');
  //   window.open(res, '_blank'); for opening in new tab
 
}

function openScan(){
    // alert(navigator.mediaDevices)
    document.body.style.backgroundColor='dodgerblue';
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(function (stream) {
        scanning = true;

        btnScanQR.hidden = true;
    canvasElement.hidden = false;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    video.srcObject = stream;
    video.play();
    tick();
    scan();
    })
    .catch((error)=>{
      alert(error)
    }) 
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
 
        // qr.callback = function (error, result) {
        //   if (error) {
        //     console.log(error);
        //     return;
        //   }
        //   console.log(result);
        // }

function sendData(data) {
  console.log(data);
  form.querySelector("input").value = data;
  form.submit();
  // sendButton.click();
}