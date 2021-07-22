const qrcode1 = window.qrcode;
 
const btn = document.querySelector('button');
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
 
const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

const sendButton = document.querySelector("form > button");
const inputBox   = document.querySelector("form > input");
 
let scanning = false;
 
qrcode1.callback = (res) => {
  if (res) {
    sendData(res);
    outputData.innerText = res;
    console.log(res);
    scanning = false;
 
    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });
 
    qrResult.hidden = false;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
  }
  // window.open(res, '_self');
  //   window.open(res, '_blank'); for opening in new tab
 
}

btnScanQR.onclick = () => {
    // alert(navigator.mediaDevices)
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then(function (stream) {
          console.log(stream)
          scanning = true;
          qrResult.hidden = true;
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
};
 
function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 100, 100, canvasElement.width, canvasElement.height);
 
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
  // console.log(data);
  // inputBox.value = data;
  // sendButton.click();
}
//   const XHR = new XMLHttpRequest()

//   // Define what happens on successful data submission
//   XHR.addEventListener('load', function (event) {
//     alert('Yeah! Data sent and response loaded.');
//   });

//   // Define what happens in case of error
//   XHR.addEventListener(' error', function (event) {
//     alert('Oops! Something went wrong.');
//   });

//   // Set up our request
//   XHR.open('POST', 'http://localhost:3000/mainpage');
//   // **********enter URL

//   // Send our FormData object; HTTP headers are set automatically
//   XHR.send(JSON.stringify(data));

// btn.addEventListener('click', function () {
//   sendData({ test: 'ok' });
// })