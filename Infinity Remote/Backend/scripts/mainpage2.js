const socket = io();
socket.emit("newUser", roomId);

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
let speedLevel = 3;
let volumeLevel = 1;
let screenType = 0;
let theatreMode = true;
let playCounter = false;
let muteCounter = false;
let rangeSlider = document.getElementById("rs-range-line");
let rangeBullet = document.getElementById("rs-bullet");
let playlist = true;

function sendSocket(message) {
  socket.emit("popupMessage", message, roomName);
}

function receiveSocket(message) {
  if (message.msg === "panelScreen") {
    screenType = 0;
    panelScreen();
  } else if (message.msg === "videoScreen") {
    screenType = 1;
    if (message.playCounter === "play") {
      playCounter = true;
    } else {
      playCounter = false;
    }
    playlist = message.playlist;
    if (message.firstConnection === true) {
      if (message.mute === "M") {
        muteCounter = false;
      } else {
        muteCounter = true;
      }
      volumeLevel = message.volume;
      rangeSlider.value = message.speed * 4 - 1;
      rangeBullet.innerHTML = "x " + playbackSpeed[rangeSlider.value];
    }
    videoScreen();
    if (message.firstConnection === false) {
      sendSocket(`volumeLevel:${volumeLevel}`);
      sendSocket(`speednew:${speedLevel}`);
      // Problem here
    }
  } else if (message.msg === "searchScreen") {
    screenType = 2;
    searchScreen();
  }
  console.log(message);
}

socket.on("contentMessage", (message) => {
  receiveSocket(message);
});

let downButtonPressed;
let rightButtonPressed;
let leftButtonPressed;
let upButtonPressed;

document.getElementById("back").className = "disabled fas fa-arrow-left fa-2x";
document.getElementById("search").addEventListener("click", search);
document.getElementById("back").addEventListener("click", back);
document.getElementById("select").addEventListener("click", select);
document.getElementById("mute").addEventListener("click", mute);
document.getElementById("step-forward").addEventListener("click", stepForward);
document
  .getElementById("step-backward")
  .addEventListener("click", stepBackward);
document.getElementById("home").addEventListener("click", home);
document.getElementById("expand").addEventListener("click", screenMode);
document.getElementById("caption").addEventListener("click", caption);
document.getElementById("rs-range-line").addEventListener("input", speed);

document.getElementById("left").addEventListener("touchstart", function () {
  leftButton();
  leftButtonPressed = setInterval(leftButton, 300);
});
document.getElementById("right").addEventListener("touchstart", function () {
  rightButton();
  rightButtonPressed = setInterval(rightButton, 300);
});
document.getElementById("up").addEventListener("touchstart", function () {
  upButton();
  upButtonPressed = setInterval(upButton, 300);
});
document.getElementById("down").addEventListener("touchstart", function () {
  downButton();
  downButtonPressed = setInterval(downButton, 300);
});
document.addEventListener("touchend", function () {
  clearInterval(downButtonPressed);
  clearInterval(leftButtonPressed);
  clearInterval(upButtonPressed);
  clearInterval(rightButtonPressed);
});

function panelScreen() {
  console.log("Panel Screen Activated");
  sendSocket("panelScreen");
  document.getElementById("select").innerHTML = "Select";
  document.getElementById("left").innerHTML =
    "<i class='enabled fas fa-chevron-left fa-2x'></i>";
  document.getElementById("left").className = "button-enabled left";
  document.getElementById("right").innerHTML =
    "<i class='enabled fas fa-chevron-right fa-2x'></i>";
  document.getElementById("right").className = "button-enabled right";
  document.getElementById("up").innerHTML =
    "<i class='enabled fas fa-chevron-up fa-2x'></i>";
  document.getElementById("down").innerHTML =
    "<i class='enabled fas fa-chevron-down fa-2x'></i>";
  document.getElementById("step-forward").innerHTML =
    "<i class='disabled fas fa-step-forward fa-2x'></i>";
  document.getElementById("step-forward").className =
    "button-disabled step-forward";
  document.getElementById("mute").innerHTML =
    "<i class='disabled fas fa-volume-mute fa-2x'></i>";
  document.getElementById("mute").className = "button-disabled mute";
  document.getElementById("step-backward").innerHTML =
    "<i class='disabled fas fa-step-backward fa-2x'></i>";
  document.getElementById("step-backward").className =
    "button-disabled step-backward";
  document.getElementById("expand").innerHTML =
    "<i class='disabled fas fa-expand fa-2x'></i>";
  document.getElementById("expand").className = "button-disabled expand";
  document.getElementById("caption").innerHTML =
    "<i class='disabled fas fa-closed-captioning fa-2x'></i>";
  document.getElementById("caption").className = "button-disabled caption";
  document.getElementById("container").style.display = "none";
}

function videoScreen() {
  console.log("Video Screen Activated");
  sendSocket("videoScreen");
  theatreMode = true;
  document.getElementById("back").className = "enabled fas fa-arrow-left fa-2x";
  document.getElementById("left").innerHTML =
    "<i class='enabled fas fa-backward fa-2x'></i>";
  document.getElementById("left").className = "button-enabled left";
  document.getElementById("right").innerHTML =
    "<i class='enabled fas fa-forward fa-2x'></i>";
  document.getElementById("right").className = "button-enabled right";
  document.getElementById("mute").className = "button-enabled mute";
  if (muteCounter === false) {
    document.getElementById("mute").innerHTML =
      "<i class='enabled fas fa-volume-mute fa-2x'></i>";
  } else {
    document.getElementById("mute").innerHTML =
      "<i class='enabled fas fa-volume-up fa-2x'></i>";
  }
  document.getElementById("step-forward").innerHTML =
    "<i class='enabled fas fa-step-forward fa-2x'></i>";
  document.getElementById("step-forward").className =
    "button-enabled step-forward";
  document.getElementById("step-backward").innerHTML =
    "<i class='enabled fas fa-step-backward fa-2x'></i>";
  document.getElementById("step-backward").className =
    "button-enabled step-backward";
  document.getElementById("caption").innerHTML =
    "<i class='enabled fas fa-closed-captioning fa-2x'></i>";
  document.getElementById("caption").className = "button-enabled caption";

  if (playCounter === true) {
    document.getElementById("select").innerHTML =
      "<i class='enabled fas fa-play fa-2x'></i>";
  } else {
    document.getElementById("select").innerHTML =
      "<i class='enabled fas fa-pause fa-2x'></i>";
  }
  document.getElementById("up").innerHTML =
    "<i class='enabled fas fa-volume-up fa-2x'></i>";
  document.getElementById("down").innerHTML =
    "<i class='enabled fas fa-volume-down fa-2x'></i>";
  document.getElementById("expand").innerHTML =
    "<i class='enabled fas fa-compress fa-2x'></i>";
  document.getElementById("expand").className = "button-enabled expand";
  document.getElementsByClassName("container")[0].style.display = "flex";
}

function searchScreen() {
  console.log("Search Screen Activated");
  sendSocket("searchScreen");
  document.getElementById("back").className = "enabled fas fa-arrow-left fa-2x";
  document.getElementById("select").innerHTML = "Select";
  document.getElementById("left").innerHTML =
    "<i class='disabled fas fa-chevron-left fa-2x'></i>";
  document.getElementById("left").className = "button-disabled left";
  document.getElementById("right").innerHTML =
    "<i class='disabled fas fa-chevron-right fa-2x'></i>";
  document.getElementById("right").className = "button-disabled right";
  document.getElementById("up").innerHTML =
    "<i class='enabled fas fa-chevron-up fa-2x'></i>";
  document.getElementById("down").innerHTML =
    "<i class='enabled fas fa-chevron-down fa-2x'></i>";
  document.getElementById("step-forward").innerHTML =
    "<i class='disabled fas fa-step-forward fa-2x'></i>";
  document.getElementById("step-forward").className =
    "button-disabled step-forward";
  document.getElementById("mute").innerHTML =
    "<i class='disabled fas fa-volume-mute fa-2x'></i>";
  document.getElementById("mute").className = "button-disabled mute";
  document.getElementById("step-backward").innerHTML =
    "<i class='disabled fas fa-step-backward fa-2x'></i>";
  document.getElementById("step-backward").className =
    "button-disabled step-backward";
  document.getElementById("expand").innerHTML =
    "<i class='disabled fas fa-expand fa-2x'></i>";
  document.getElementById("expand").className = "button-disabled expand";
  document.getElementById("caption").innerHTML =
    "<i class='disabled fas fa-closed-captioning fa-2x'></i>";
  document.getElementById("caption").className = "button-disabled caption";
  document.getElementsByClassName("container")[0].style.display = "none";
}

function select() {
  console.log("Select Button clicked");
  if (screenType === 1) {
    if (theatreMode === true) {
      sendSocket("changePlay");
      playCounter = !playCounter;
      if (playCounter === true) {
        document.getElementById("select").innerHTML =
          "<i class='enabled fas fa-play fa-2x'></i>";
      } else {
        document.getElementById("select").innerHTML =
          "<i class='enabled fas fa-pause fa-2x'></i>";
      }
    } else {
      sendSocket("searchSelect");
      theatreMode = true;
      //  Problem Creator - Will have to be checked
    }
  } else if (screenType === 0) {
    sendSocket("panelSelect");
  } else {
    sendSocket("searchSelect");
  }
}

function back() {
  console.log("Back Button clicked");
  sendSocket("back");
}

function screenMode() {
  console.log("Screen Button clicked");
  if (screenType === 1) {
    theatreMode = !theatreMode;
    sendSocket("screenMode");
    if (theatreMode === true) {
      if (playCounter === true) {
        document.getElementById("select").innerHTML =
          "<i class='enabled fas fa-play fa-2x'></i>";
      } else {
        document.getElementById("select").innerHTML =
          "<i class='enabled fas fa-pause fa-2x'></i>";
      }
      document.getElementById("up").innerHTML =
        "<i class='enabled fas fa-volume-up fa-2x'></i>";
      document.getElementById("down").innerHTML =
        "<i class='enabled fas fa-volume-down fa-2x'></i>";
      document.getElementById("expand").innerHTML =
        "<i class='enabled fas fa-compress fa-2x'></i>";
      document.getElementById("expand").className = "button-enabled expand";
      document.getElementById("left").innerHTML =
        "<i class='enabled fas fa-backward fa-2x'></i>";
      document.getElementById("left").className = "button-enabled left";
      document.getElementById("right").innerHTML =
        "<i class='enabled fas fa-forward fa-2x'></i>";
      document.getElementById("right").className = "button-enabled right";
    } else {
      document.getElementById("select").innerHTML = "Select";
      document.getElementById("up").innerHTML =
        "<i class='enabled fas fa-chevron-up fa-2x'></i>";
      document.getElementById("down").innerHTML =
        "<i class='enabled fas fa-chevron-down fa-2x'></i>";
      document.getElementById("expand").innerHTML =
        "<i class='enabled fas fa-expand fa-2x'></i>";
      document.getElementById("expand").className = "button-enabled expand";
      document.getElementById("left").innerHTML =
        "<i class='enabled fas fa-chevron-left fa-2x'></i>";
      document.getElementById("right").innerHTML =
        "<i class='enabled fas fa-chevron-right fa-2x'></i>";
      if (playlist === true) {
        document.getElementById("left").innerHTML =
          "<i class='enabled fas fa-chevron-left fa-2x'></i>";
        document.getElementById("right").innerHTML =
          "<i class='enabled fas fa-chevron-right fa-2x'></i>";
        document.getElementById("left").className = "button-enabled left";
        document.getElementById("right").className = "button-enabled right";
      } else {
        document.getElementById("left").innerHTML =
          "<i class='disabled fas fa-chevron-left fa-2x'></i>";
        document.getElementById("right").innerHTML =
          "<i class='disabled fas fa-chevron-right fa-2x'></i>";
        document.getElementById("left").className = "button-disabled left";
        document.getElementById("right").className = "button-disabled right";
      }
    }
  }
}

function stepBackward() {
  console.log("Step Back Button clicked");
  if (screenType === 1) {
    sendSocket("stepBackward");
  }
}
function stepForward() {
  console.log("Step Forward button clicked");
  if (screenType === 1) {
    sendSocket("stepForward");
  }
}

function leftButton() {
  console.log("Left Button clicked");
  if (screenType !== 2) {
    if (theatreMode === true || screenType === 0) {
      sendSocket("leftButton");
    } else if (playlist === true) {
      sendSocket("playlistBackward");
    }
  }
}
function rightButton() {
  console.log("Right Button clicked");
  if (screenType != 2) {
    if (theatreMode == true || screenType == 0) {
      sendSocket("rightButton");
    } else if (playlist === true) {
      sendSocket("playlistForward");
    }
  }
}

function mute() {
  console.log("Mute/Unmute Button clicked");
  if (screenType === 1) {
    sendSocket("mute");
    muteCounter = !muteCounter;
    if (muteCounter === true) {
      document.getElementById("mute").innerHTML =
        "<i class='enabled fas fa-volume-up fa-2x'></i>";
    } else {
      document.getElementById("mute").innerHTML =
        "<i class='enabled fas fa-volume-mute fa-2x'></i>";
    }
  }
}

function upButton() {
  console.log("Up Button clicked");
  if (screenType === 1 && theatreMode === true) {
    sendSocket("volumeIncrease");
    volumelevel += 0.1;
    volumelevel = Math.min(1, volumelevel);
  } else {
    sendSocket("upButton");
  }
}
function downButton() {
  console.log("Down Button clicked");
  if (screenType === 1 && theatreMode === true) {
    sendSocket("volumeDecrease");
    volumelevel -= 0.1;
    volumelevel = Math.max(0, volumelevel);
  } else {
    sendSocket("downButton");
  }
}
// Problem check if firstc-False is required or not
function caption() {
  console.log("Closed Captions clicked");
  if (screenType === 1) {
    sendSocket("caption");
  }
}

function searchEntered(event){
  if (event.keyCode == 13){
    search()
  }
}
function search() {
  let x = document.getElementById("searchbox").value;
  x = encodeURIComponent(x);
  if (x !== "") {
    sendSocket(`search:${x}`);
  }
  document.getElementById("searchbox").value = "";
}

function home() {
  sendSocket("home");
}

function speed() {
  console.log("Playback speed set");
  rangeBullet.innerHTML = "x " + playbackSpeed[rangeSlider.value];
  sendSocket(`speedLevel:${rangeSlider.value}`);
  speedLevel = rangeSlider.value;
}

function connectToExtension() {
  sendSocket("connectToExtension");
}
console.log("Remote Working Great");
connectToExtension();
