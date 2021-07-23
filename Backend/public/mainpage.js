const socket = io("http://192.168.1.10:3000");
socket.emit("new-pwa-user", roomName);

const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}
const playbackSpeed = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
var initvalue = 3;
var volumelevel = 1;
var selectcounter = 0;
var theatremode = true;
var playcounter = false;
var volumecounter = false;
let rangeSlider = document.getElementById("rs-range-line");
let rangeBullet = document.getElementById("rs-bullet");
var playlist = true;

function sendsocket(message) {
  socket.emit("popupmessage", message, roomName);
}

function receivesocket(message) {
  if (message.msg === "panelscreen") {
    selectcounter = 0;
    panelscreen();
  } else if (message.msg === "videoscreen") {
    selectcounter = 1;
    if (message.playcounter === "Play") {
      playcounter = true;
    } else {
      playcounter = false;
    }
    playlist=message.playlist;
    if (message.firstc == true) {
      if (message.mute=="M"){
        volumecounter=false;
      }
      else{
        volumecounter=true;
      }
      volumelevel = message.volume;
      rangeSlider.value = message.speed * 4 - 1;
      rangeBullet.innerHTML = "x " + playbackSpeed[rangeSlider.value];
    }
    videoscreen();
    if (message.firstc == false) {
      sendsocket(`volume,${volumelevel}`);
      sendsocket(`speedlevel,${initvalue}`);
    }
    console.log("hi");
  } else if (message.msg === "searchscreen") {
    selectcounter = 2;
    searchscreen();
  }
  console.log(message);
}

socket.on("contentmessage", (message) => {
  receivesocket(message);
});

var downid;
var rightid;
var leftid;
var upid;

document.getElementById("p13").addEventListener("click", search);
document.getElementById("p").addEventListener("click", changeback);
document.getElementById("p1").addEventListener("click", change);
document.getElementById("p6").addEventListener("click", stepfor);
document.getElementById("p7").addEventListener("click", vol);
document.getElementById("p8").addEventListener("click", stepback);
document.getElementById("p9").addEventListener("click", youtube);
document.getElementById("p10").addEventListener("click", screene);
document.getElementById("p11").addEventListener("click", caption);
document.querySelectorAll("input")[1].addEventListener("input", speed);
document.getElementById("p2").addEventListener("mousedown", function () {
  leftbutton();
  leftid = setInterval(leftbutton, 300);
});
document.getElementById("p3").addEventListener("mousedown", function () {
  rightbutton();
  rightid = setInterval(rightbutton, 300);
});
document.getElementById("p4").addEventListener("mousedown", function () {
  upbutton();
  upid = setInterval(upbutton, 300);
});
document.getElementById("p5").addEventListener("mousedown", function () {
  downbutton();
  downid = setInterval(downbutton, 300);
});
document.addEventListener("mouseup", function () {
  clearInterval(downid);
  clearInterval(leftid);
  clearInterval(upid);
  clearInterval(rightid);
});
document.getElementById("p").className = "disabled fas fa-arrow-left fa-2x";

function panelscreen() {
  console.log("Panel Screen Activated");
  sendsocket("panelscreen");
  document.getElementById("p1").innerHTML = "Select";
  document.getElementById("p2").innerHTML =
    "<i class='enabled fas fa-chevron-left fa-2x'></i>";
  document.getElementById("p2").className = "button1 left";
  document.getElementById("p3").innerHTML =
    "<i class='enabled fas fa-chevron-right fa-2x'></i>";
  document.getElementById("p3").className = "button1 right";
  document.getElementById("p4").innerHTML =
    "<i class='enabled fas fa-chevron-up fa-2x'></i>";
  document.getElementById("p5").innerHTML =
    "<i class='enabled fas fa-chevron-down fa-2x'></i>";
  document.getElementById("p6").innerHTML =
    "<i class='disabled fas fa-step-forward fa-2x'></i>";
  document.getElementById("p6").className = "button2 step-forward";
  document.getElementById("p7").innerHTML =
    "<i class='disabled fas fa-volume-mute fa-2x'></i>";
  document.getElementById("p7").className = "button2 mute";
  document.getElementById("p8").innerHTML =
    "<i class='disabled fas fa-step-backward fa-2x'></i>";
  document.getElementById("p8").className = "button2 step-backward";
  document.getElementById("p9").innerHTML =
    "<i class='enabled fas fa-home fa-2x'></i>";
  document.getElementById("p9").className = "button1 home";
  document.getElementById("p10").innerHTML =
    "<i class='disabled fas fa-expand fa-2x'></i>";
  document.getElementById("p10").className = "button2 expand";
  document.getElementById("p11").innerHTML =
    "<i class='disabled fas fa-closed-captioning fa-2x'></i>";
  document.getElementById("p11").className = "button2 caption";
  document.getElementsByClassName("container")[0].style.display = "none";
}

function videoscreen() {
  console.log("Video Screen Activated");
  sendsocket("videoscreen");
  theatremode=true;
  document.getElementById("p").className = "enabled fas fa-arrow-left fa-2x";
  document.getElementById("p2").innerHTML =
    "<i class='enabled fas fa-backward fa-2x'></i>";
  document.getElementById("p2").className = "button1 left";
  document.getElementById("p3").innerHTML =
    "<i class='enabled fas fa-forward fa-2x'></i>";
  document.getElementById("p3").className = "button1 right";
  document.getElementById("p6").innerHTML =
    "<i class='enabled fas fa-step-forward fa-2x'></i>";
  document.getElementById("p6").className = "button1 step-forward";
  if (volumecounter===false){
    document.getElementById("p7").innerHTML =
    "<i class='enabled fas fa-volume-mute fa-2x'></i>";
  }else{
    document.getElementById("p7").innerHTML =
    "<i class='enabled fas fa-volume-up fa-2x'></i>";
  }
  document.getElementById("p7").className = "button1 mute";
  document.getElementById("p8").innerHTML =
    "<i class='enabled fas fa-step-backward fa-2x'></i>";
  document.getElementById("p8").className = "button1 step-backward";
  document.getElementById("p11").innerHTML =
    "<i class='enabled fas fa-closed-captioning fa-2x'></i>";
  document.getElementById("p11").className = "button1 caption";
  document.getElementById("p9").innerHTML =
    "<i class='enabled fas fa-home fa-2x'></i>";
  document.getElementById("p9").className = "button1 home";
  if (playcounter == true) {
    document.getElementById("p1").innerHTML =
      "<i class='enabled fas fa-play fa-2x'></i>";
  } else {
    document.getElementById("p1").innerHTML =
      "<i class='enabled fas fa-pause fa-2x'></i>";
  }
  document.getElementById("p4").innerHTML =
    "<i class='enabled fas fa-volume-up fa-2x'></i>";
  document.getElementById("p5").innerHTML =
    "<i class='enabled fas fa-volume-down fa-2x'></i>";
  document.getElementById("p10").innerHTML =
    "<i class='enabled fas fa-compress fa-2x'></i>";
  document.getElementById("p10").className = "button1 expand";
  document.getElementsByClassName("container")[0].style.display = "flex";
}
function searchscreen() {
  console.log("Search Screen Activated");
  sendsocket("searchscreen");
  document.getElementById("p").className = "enabled fas fa-arrow-left fa-2x";
  document.getElementById("p1").innerHTML = "Select";
  document.getElementById("p2").innerHTML =
    "<i class='disabled fas fa-chevron-left fa-2x'></i>";
  document.getElementById("p2").className = "button2 left";
  document.getElementById("p3").innerHTML =
    "<i class='disabled fas fa-chevron-right fa-2x'></i>";
  document.getElementById("p3").className = "button2 right";
  document.getElementById("p4").innerHTML =
    "<i class='enabled fas fa-chevron-up fa-2x'></i>";
  document.getElementById("p5").innerHTML =
    "<i class='enabled fas fa-chevron-down fa-2x'></i>";
  document.getElementById("p6").innerHTML =
    "<i class='disabled fas fa-step-forward fa-2x'></i>";
  document.getElementById("p6").className = "button2 step-forward";
  document.getElementById("p7").innerHTML =
    "<i class='disabled fas fa-volume-mute fa-2x'></i>";
  document.getElementById("p7").className = "button2 mute";
  document.getElementById("p8").innerHTML =
    "<i class='disabled fas fa-step-backward fa-2x'></i>";
  document.getElementById("p8").className = "button2 step-backward";
  document.getElementById("p9").innerHTML =
    "<i class='enabled fas fa-home fa-2x'></i>";
  document.getElementById("p9").className = "button1 home";
  document.getElementById("p10").innerHTML =
    "<i class='disabled fas fa-expand fa-2x'></i>";
  document.getElementById("p10").className = "button2 expand";
  document.getElementById("p11").innerHTML =
    "<i class='disabled fas fa-closed-captioning fa-2x'></i>";
  document.getElementById("p11").className = "button2 caption";
  document.getElementsByClassName("container")[0].style.display = "none";
}

function change() {
  console.log("Select Button clicked");
  if (selectcounter == 1) {
    if (theatremode == true) {
      sendsocket("changeplay");
      playcounter = !playcounter;
      if (playcounter == true) {
        document.getElementById("p1").innerHTML =
          "<i class='enabled fas fa-play fa-2x'></i>";
      } else {
        document.getElementById("p1").innerHTML =
          "<i class='enabled fas fa-pause fa-2x'></i>";
      }
    } else {
      sendsocket("searchselect");
      theatremode = true;
    }
  } else if (selectcounter == 0) {
    sendsocket("changeselect");
  } else {
    sendsocket("searchselect");
  }
}

function changeback() {
  console.log("Back Button clicked");
  sendsocket("changeback");
}

function screene() {
  console.log("Screen Button clicked");
  if (selectcounter == 1) {
    theatremode = !theatremode;
    sendsocket("screene");
    if (theatremode == true) {
      if (playcounter == true) {
        document.getElementById("p1").innerHTML =
          "<i class='enabled fas fa-play fa-2x'></i>";
      } else {
        document.getElementById("p1").innerHTML =
          "<i class='enabled fas fa-pause fa-2x'></i>";
      }
      document.getElementById("p4").innerHTML =
        "<i class='enabled fas fa-volume-up fa-2x'></i>";
      document.getElementById("p5").innerHTML =
        "<i class='enabled fas fa-volume-down fa-2x'></i>";
      document.getElementById("p10").innerHTML =
        "<i class='enabled fas fa-compress fa-2x'></i>";
      document.getElementById("p10").className = "button1 expand";
    } else {
      document.getElementById("p1").innerHTML = "Select";
      document.getElementById("p4").innerHTML =
        "<i class='enabled fas fa-chevron-up fa-2x'></i>";
      document.getElementById("p5").innerHTML =
        "<i class='enabled fas fa-chevron-down fa-2x'></i>";
      document.getElementById("p10").innerHTML =
        "<i class='enabled fas fa-expand fa-2x'></i>";
      document.getElementById("p10").className = "button1 expand";
      document.getElementById("p2").innerHTML =
      "<i class='enabled fas fa-chevron-left fa-2x'></i>";
      document.getElementById("p3").innerHTML =
      "<i class='enabled fas fa-chevron-right fa-2x'></i>";
      if (playlist===true){
        document.getElementById("p2").innerHTML =
        "<i class='enabled fas fa-chevron-left fa-2x'></i>";
        document.getElementById("p3").innerHTML =
        "<i class='enabled fas fa-chevron-right fa-2x'></i>";
        document.getElementById("p2").className = "button1 left";
        document.getElementById("p3").className = "button1 right";

      }
      else{
        document.getElementById("p2").innerHTML =
        "<i class='disabled fas fa-chevron-left fa-2x'></i>";
        document.getElementById("p3").innerHTML =
        "<i class='disabled fas fa-chevron-right fa-2x'></i>";
        document.getElementById("p2").className = "button2 left";
        document.getElementById("p3").className = "button2 right";
      }
    }
  }
}

function stepback() {
  console.log("Step Back Button clicked");
  if (selectcounter == 1) {
    sendsocket("stepback");
  }
}
function stepfor() {
  console.log("Step Forward button clicked");
  if (selectcounter == 1) {
    sendsocket("stepfor");
  }
}

function leftbutton() {
  console.log("Left Button clicked");
  if (selectcounter != 2) {
    if (theatremode == true || selectcounter == 0) {
      sendsocket("leftbutton");
    } else {
      if (playlist===true){
        sendsocket("backward");
      }
    }
  }
}
function rightbutton() {
  console.log("Right Button clicked");
  if (selectcounter != 2) {
    if (theatremode == true || selectcounter == 0) {
      sendsocket("rightbutton");
    } else {
      if (playlist===true){
        sendsocket("forward");
      }
    }
  }
}

function vol() {
  console.log("Mute/Unmute Button clicked");
  if (selectcounter == 1) {
    sendsocket("vol");
    volumecounter = !volumecounter;
    if (volumecounter == true) {
      document.getElementById("p7").innerHTML =
        "<i class='enabled fas fa-volume-up fa-2x'></i>";
    } else {
      document.getElementById("p7").innerHTML =
        "<i class='enabled fas fa-volume-mute fa-2x'></i>";
    }
  }
}

function upbutton() {
  console.log("Up Button clicked");
  if (selectcounter == 1 && theatremode == true) {
    sendsocket("volup");
    volumelevel += 0.1;
    volumelevel = Math.min(1, volumelevel);
  } else {
    sendsocket("upbutton");
  }
}
function downbutton() {
  console.log("Down Button clicked");
  if (selectcounter == 1 && theatremode == true) {
    sendsocket("voldown");
    volumelevel -= 0.1;
    volumelevel = Math.max(0, volumelevel);
  } else {
    sendsocket("downbutton");
  }
}

function caption() {
  console.log("Closed Captions clicked");
  if (selectcounter == 1) {
    sendsocket("caption");
  }
}

function search() {
  let x = document.getElementById("searchbox").value;
  if (x === "") {
    //do nothing
  } else {
    sendsocket(`search,${x}`);
  }
  document.getElementById("searchbox").value = "";
}

function youtube() {
  sendsocket("youtube");
}

function speed() {
  console.log("Playback speed set");
  rangeBullet.innerHTML = "x " + playbackSpeed[rangeSlider.value];
  sendsocket(`speed,${rangeSlider.value}`);
  initvalue = rangeSlider.value;
}

function sendMeURL() {
  sendsocket("sendMeURL");
}
console.log("Popup Working Great");
sendMeURL();

// document.getElementsByTagName("video")[0].playbackRate
