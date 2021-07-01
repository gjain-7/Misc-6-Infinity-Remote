var selectcounter = 0;
var screencounter = false;
var playcounter = false;
var volumecounter = false;

function apply(message) {
  let params = {
    active: true,
    currentWindow: true,
  };
  chrome.tabs.query(params, gotTab);
  function gotTab(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  }
}

function gotMsg(message, sender, _sendResponse) {
  if (
    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?(\?app\=desktop)?$/.test(
      message.url
    )
  ) {
    selectcounter = 0;
    panelscreen();
  } else if (
    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?watch/.test(
      message.url
    )
  ) {
    selectcounter = 1;
    videoscreen();
  } else if (
    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?results\?search\_query\=/.test(
      message.url
    )
  ) {
    selectcounter = 2;
    searchscreen();
  }
}

chrome.runtime.onMessage.addListener(gotMsg);

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
    localStorage.setItem("theme", "dark"); //add this
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
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

var downid;
var rightid;
var leftid;
var upid;

document.getElementById("p").addEventListener("click", changeback);
document.getElementById("p1").addEventListener("click", change);
//   document.getElementById("p2").addEventListener("click",leftbutton);
//   document.getElementById("p3").addEventListener("click",rightbutton);
//   document.getElementById("p4").addEventListener("click",upbutton);
//   document.getElementById("p5").addEventListener("click",downbutton);
document.getElementById("p6").addEventListener("click", stepfor);
document.getElementById("p7").addEventListener("click", vol);
document.getElementById("p8").addEventListener("click", stepback);
document.getElementById("p9").addEventListener("click", search);
document.getElementById("p10").addEventListener("click", screene);
document.getElementById("p11").addEventListener("click", caption);
// document
//   .getElementById("rs-range-line")
//   .addEventListener("input", speed, false);

document.getElementById("p2").addEventListener("mousedown", function () {
  leftbutton();
  leftid = setInterval(leftbutton, 300);
});
document.getElementById("p2").addEventListener("mouseup", function () {
  clearInterval(leftid);
});
document.getElementById("p3").addEventListener("mousedown", function () {
  rightbutton();
  rightid = setInterval(rightbutton, 300);
});
document.getElementById("p3").addEventListener("mouseup", function () {
  clearInterval(rightid);
});
document.getElementById("p4").addEventListener("mousedown", function () {
  upbutton();
  upid = setInterval(upbutton, 300);
});
document.getElementById("p4").addEventListener("mouseup", function () {
  clearInterval(upid);
});
document.getElementById("p5").addEventListener("mousedown", function () {
  downbutton();
  downid = setInterval(downbutton, 300);
});
document.getElementById("p5").addEventListener("mouseup", function () {
  clearInterval(downid);
});
document.querySelectorAll("input")[1].addEventListener("input", speed);

document.getElementById("p").className = "disabled fas fa-arrow-left fa-3x";

function panelscreen() {
  document.getElementById("p1").innerHTML = "Select";
  document.getElementById("p2").innerHTML =
    "<i class='enabled fas fa-chevron-left fa-2x'></i>";
  document.getElementById("p3").innerHTML =
    "<i class='enabled fas fa-chevron-right fa-2x'></i>";
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
    "<i class='enabled fas fa-search fa-2x'></i>";
  document.getElementById("p9").className = "button1 search";
  document.getElementById("p10").innerHTML =
    "<i class='disabled fas fa-expand fa-2x'></i>";
  document.getElementById("p10").className = "button2 expand";
  document.getElementById("p11").innerHTML =
    "<i class='disabled fas fa-closed-captioning fa-2x'></i>";
  document.getElementById("p11").className = "button2 caption";
  document.getElementsByClassName("container")[0].style.display = "none" ;
}

function videoscreen() {
  document.getElementById("p").className = "enabled fas fa-arrow-left fa-3x";
  document.getElementById("p1").innerHTML =
    "<i class='enabled fas fa-pause fa-2x'></i>";
  playcounter = false;
  document.getElementById("p2").innerHTML =
    "<i class='enabled fas fa-backward fa-2x'></i>";
  document.getElementById("p3").innerHTML =
    "<i class='enabled fas fa-forward fa-2x'></i>";
  document.getElementById("p4").innerHTML =
    "<i class='enabled fas fa-volume-up fa-2x'></i>";
  document.getElementById("p5").innerHTML =
    "<i class='enabled fas fa-volume-down fa-2x'></i>";
  document.getElementById("p6").innerHTML =
    "<i class='enabled fas fa-step-forward fa-2x'></i>";
  document.getElementById("p6").className = "button1 step-forward";
  document.getElementById("p7").innerHTML =
    "<i class='enabled fas fa-volume-mute fa-2x'></i>";
  document.getElementById("p7").className = "button1 mute";
  document.getElementById("p8").innerHTML =
    "<i class='enabled fas fa-step-backward fa-2x'></i>";
  document.getElementById("p8").className = "button1 step-backward";
  document.getElementById("p11").innerHTML =
    "<i class='enabled fas fa-closed-captioning fa-2x'></i>";
  document.getElementById("p11").className = "button1 caption";
  if (screencounter == false) {
    document.getElementById("p9").innerHTML =
      "<i class='enabled fas fa-search fa-2x'></i>";
    document.getElementById("p9").className = "button1 search";
    document.getElementById("p10").innerHTML =
      "<i class='enabled fas fa-expand fa-2x'></i>";
    document.getElementById("p10").className = "button1 expand";
  } else {
    document.getElementById("p9").innerHTML =
      "<i class='disabled fas fa-search fa-2x'></i>";
    document.getElementById("p9").className = "button2 search";
    document.getElementById("p10").innerHTML =
      "<i class='enabled fas fa-compress fa-2x'></i>";
    document.getElementById("p10").className = "button1 expand";
    }
    document.getElementsByClassName("container")[0].style.display = "flex" ;
}
function searchscreen() {
  document.getElementById("p").className = "enabled fas fa-arrow-left fa-3x";
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
    "<i class='enabled fas fa-search fa-2x'></i>";
  document.getElementById("p9").className = "button1 search";
  document.getElementById("p10").innerHTML =
    "<i class='disabled fas fa-expand fa-2x'></i>";
  document.getElementById("p10").className = "button2 expand";
  document.getElementById("p11").innerHTML =
    "<i class='disabled fas fa-closed-captioning fa-2x'></i>";
  document.getElementById("p11").className = "button2 caption";
  document.getElementsByClassName("container")[0].style.display = "none" ;
}

function change() {
  if (selectcounter == 1) {
    apply("changeplay");
    playcounter = !playcounter;
    if (playcounter == true) {
      document.getElementById("p1").innerHTML =
        "<i class='enabled fas fa-play fa-2x'></i>";
    } else {
      document.getElementById("p1").innerHTML =
        "<i class='enabled fas fa-pause fa-2x'></i>";
    }
  } else if (selectcounter == 0) {
    apply("changeselect");
  } else {
    apply("searchselect");
  }
}

function changeback() {
  apply("changeback");
}

function screene() {
  if (selectcounter == 1) {
    screencounter = !screencounter;
    apply("screene");
    if (screencounter == true) {
      document.getElementById("p10").innerHTML =
        "<i class='enabled fas fa-compress fa-2x'></i>";
      document.getElementById("p9").innerHTML =
        "<i class='disabled fas fa-search fa-2x'></i>";
      document.getElementById("p9").className = "button2 search";
    } else {
      document.getElementById("p10").innerHTML =
        "<i class='enabled fas fa-expand fa-2x'></i>";
      document.getElementById("p9").innerHTML =
        "<i class='enabled fas fa-search fa-2x'></i>";
      document.getElementById("p9").className = "button1 search";
    }
  }
}

function stepback() {
  if (selectcounter == 1) {
    apply("stepback");
  }
}
function stepfor() {
  if (selectcounter == 1) {
    apply("stepfor");
  }
}

function leftbutton() {
  if (selectcounter != 2) {
    apply("leftbutton");
  }
}
function rightbutton() {
  if (selectcounter != 2) {
    apply("rightbutton");
  }
}

function vol() {
  if (selectcounter == 1) {
    apply("vol");
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
  if (selectcounter == 1) {
    apply("volup");
  } else {
    apply("upbutton");
  }
}
function downbutton() {
  if (selectcounter == 1) {
    apply("voldown");
  } else {
    apply("downbutton");
  }
}

function caption() {
  if (selectcounter == 1) {
    apply("caption");
  }
}

function search() {
  if (screencounter == false) {
    apply("search");
  }
}

function speed(){
    const playbackSpeed = [0.25,0.5,0.75,1,1.25,1.5,1.75,2];
    let rangeSlider = document.getElementById("rs-range-line");
    let rangeBullet = document.getElementById("rs-bullet");
    rangeBullet.innerHTML = "x "+ playbackSpeed[rangeSlider.value];
    apply(`speed,${rangeSlider.value}`);
}

console.log("Popup Completed");
panelscreen();
