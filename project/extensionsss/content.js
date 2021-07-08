var initvalue = 3;
var volumelevel = 1;

function sendfirstinfo() {
  console.log("first connection");
  let url = window.location.href;
  if (
    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?(\?app\=desktop)?$/.test(
      url
    )
  ) {
    chrome.runtime.sendMessage({
      firstc: true,
      msg: "panelscreen",
    });
  } else if (
    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?watch/.test(url)
  ) {
    chrome.runtime.sendMessage({
      firstc: true,
      msg: "videoscreen",
      speed: document.getElementsByTagName("video")[0].playbackRate,
      volume: document.getElementsByClassName("video-stream")[0].volume,
      playcounter: document
        .getElementsByClassName("ytp-play-button")[0]
        .attributes["aria-label"].nodeValue.slice(0, -4),
    });
    initvalue = document.getElementsByTagName("video")[0].playbackRate * 4 - 1;
    volumelevel = document.getElementsByClassName("video-stream")[0].volume;
  } else if (
    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?results\?search\_query\=/.test(
      url
    )
  ) {
    chrome.runtime.sendMessage({
      firstc: true,
      msg: "searchscreen",
    });
  }
}

function sendinfo() {
  console.log("later connection");
  let url = window.location.href;
  if (
    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?(\?app\=desktop)?$/.test(
      url
    )
  ) {
    chrome.runtime.sendMessage({
      firstc: false,
      msg: "panelscreen",
    });
  } else if (
    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?watch/.test(url)
  ) {
    chrome.runtime.sendMessage({
      firstc: false,
      msg: "videoscreen",
      playcounter: document
        .getElementsByClassName("ytp-play-button")[0]
        .attributes["aria-label"].nodeValue.slice(0, -4),
    });
  } else if (
    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?results\?search\_query\=/.test(
      url
    )
  ) {
    chrome.runtime.sendMessage({
      firstc: false,
      msg: "searchscreen",
    });
  }
}

let lastUrl = location.href;
sendinfo();
// console.log("sent initial");

new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    sendinfo();
  }
}).observe(document, { subtree: true, childList: true });

var vidopanels;
var panelcounter;
var carrotbutton;
let columnnum = 1;
var muted = 0;
var carrot = false;

function setcolumn() {
  if (window.innerWidth > 1143) {
    columnnum = 4;
  } else if (window.innerWidth > 887) {
    columnnum = 3;
  } else {
    columnnum = 2;
  }
}
window.addEventListener("resize", setcolumn);
setcolumn();
function panelscreen() {
  console.log("panels");
  carrotbutton = document.querySelectorAll(
    "ytd-button-renderer#show-more-button"
  );
  for (let i of carrotbutton) {
    i.style.padding = "2px 0px 0px 0px";
    i.style.borderBottom = "6px solid red";
  }
  var carrottoken = 0;
  var carrotarray = new Array(carrotbutton.length);
  for (let index = 0; index < carrotbutton.length; index++) {
    carrotarray[index] = index;
  }
  carrot = false;
  panelcounter = 0;
  videopanels = document.querySelectorAll("ytd-rich-item-renderer");
  videopanels[panelcounter].style.borderBottom = "6px solid dodgerblue";
  let videomarginb = parseFloat(
    getComputedStyle(videopanels[panelcounter], null)
      .getPropertyValue("margin-bottom")
      .slice(0, -2)
  );
  let newvideomarginb = videomarginb - 6;
  videopanels[panelcounter].style.marginBottom = newvideomarginb + "px";
  videopanels[panelcounter].scrollIntoView({ block: "center" });
  window.addEventListener(
    "keydown",
    function (event) {
      if (carrot) {
        carrotbutton[carrotarray[carrottoken]].style.borderBottom =
          "6px solid red";
        if (event.code === "ArrowDown") {
          let x = panelcounter % columnnum;
          while (videopanels[panelcounter].offsetTop == 0) {
            panelcounter++;
          }
          panelcounter += x;
          carrottoken++;
        } else if (event.code === "ArrowUp") {
          let x = panelcounter % columnnum;
          while (videopanels[panelcounter].offsetTop == 0) {
            panelcounter -= 1;
          }
          panelcounter = panelcounter + x + 1 - columnnum;
        } else if (event.code === "ArrowLeft") {
          while (videopanels[panelcounter].offsetTop == 0) {
            panelcounter -= 1;
          }
        } else if (event.code === "ArrowRight") {
          while (videopanels[panelcounter].offsetTop == 0) {
            panelcounter++;
          }
          carrottoken++;
        } else if (event.code === "Enter") {
          let x = panelcounter % columnnum;
          while (videopanels[panelcounter].offsetTop == 0) {
            panelcounter -= 1;
          }
          panelcounter = panelcounter + x + 1;
          carrotbutton[carrotarray[carrottoken]].click();
          carrotarray.splice(carrottoken, 1);
          console.log(carrotarray[carrottoken]);
        }
        carrot = false;
        videopanels[panelcounter].scrollIntoView({ block: "center" });
        videomarginb = parseFloat(
          getComputedStyle(videopanels[panelcounter], null)
            .getPropertyValue("margin-bottom")
            .slice(0, -2)
        );
        newvideomarginb = videomarginb - 6;
        videopanels[panelcounter].style.marginBottom = newvideomarginb + "px";
        videopanels[panelcounter].style.borderBottom = "6px solid dodgerblue";
      } else {
        videopanels = document.querySelectorAll("ytd-rich-item-renderer");
        videopanels[panelcounter].style.borderBottom = "none";
        videopanels[panelcounter].style.marginBottom = videomarginb + "px";
        var z = false;
        if (event.code === "ArrowDown") {
          panelcounter += columnnum;
        } else if (event.code === "ArrowUp") {
          panelcounter -= columnnum;
          z = true;
        } else if (event.code === "ArrowLeft") {
          panelcounter -= 1;
          z = true;
        } else if (event.code === "ArrowRight") {
          panelcounter += 1;
        }
        if (panelcounter < 0) {
          panelcounter = 0;
        }
        if (videopanels[panelcounter].offsetTop == 0) {
          if (z) {
            carrottoken -= 1;
          }
          carrotbutton[carrotarray[carrottoken]].style.borderBottom =
            "6px solid dodgerblue";
          carrot = true;
        } else {
          videopanels[panelcounter].scrollIntoView({ block: "center" });
          videomarginb = parseFloat(
            getComputedStyle(videopanels[panelcounter], null)
              .getPropertyValue("margin-bottom")
              .slice(0, -2)
          );
          newvideomarginb = videomarginb - 6;
          videopanels[panelcounter].style.marginBottom = newvideomarginb + "px";
          videopanels[panelcounter].style.borderBottom = "6px solid dodgerblue";
        }
      }
      event.preventDefault();
    },
    true
  );
}

function volumeset() {
  document.getElementsByClassName("video-stream")[0].volume = volumelevel;
  console.log(volumelevel);
}
function videoscreen() {
  setInterval(volumeset, 50);
}

function volup() {
  volumelevel += 0.1;
  volumelevel = Math.min(1, volumelevel);
  volumeset();
}
function voldown() {
  volumelevel -= 0.1;
  volumelevel = Math.max(0, volumelevel);
  volumeset();
}

function screene() {
  console.log("fullscreen dabaya tha")
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "KeyF",
    key: "f",
    shiftKey: false,
    keyCode: 70,
  });
  document.dispatchEvent(e);
}
function vol() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "KeyM",
    key: "m",
    shiftKey: false,
    keyCode: 77,
  });
  document.dispatchEvent(e);
}
function stepback() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "KeyP",
    key: "P",
    shiftKey: true,
    keyCode: 80,
  });
  document.dispatchEvent(e);
}
function stepfor() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "KeyN",
    key: "N",
    shiftKey: true,
    keyCode: 78,
  });
  document.dispatchEvent(e);
  //setTimeout(volumeset,1000);
}

function leftbutton() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "ArrowLeft",
    key: "ArrowLeft",
    shiftKey: false,
    keyCode: 37,
  });
  document.dispatchEvent(e);
}
function rightbutton() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "ArrowRight",
    key: "ArrowRight",
    shiftKey: false,
    keyCode: 39,
  });
  document.dispatchEvent(e);
}
function upbutton() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "ArrowUp",
    key: "ArrowUp",
    shiftKey: false,
    keyCode: 38,
  });
  document.dispatchEvent(e);
}
function downbutton() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "ArrowDown",
    key: "ArrowDown",
    shiftKey: false,
    keyCode: 40,
  });
  document.dispatchEvent(e);
}

function caption() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "KeyC",
    key: "c",
    shiftKey: false,
    keyCode: 67,
  });
  document.dispatchEvent(e);
}

function search() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "Slash",
    key: "/",
    shiftKey: false,
    keyCode: 191,
  });
  document.dispatchEvent(e);
}
function changeback() {
  window.history.back();
  // setTimeout(volumeset,1000);
}
function changeselect() {
  if (carrot == true) {
    var e = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      charCode: "0",
      code: "Enter",
      key: "Enter",
      shiftKey: false,
      keyCode: 13,
    });
    document.dispatchEvent(e);
  } else {
    this.document.location = videopanels[panelcounter].querySelector("a").href;
  }
  // setTimeout(volumeset,1000);
}

function youtube() {
  this.document.location = "https://www.youtube.com/";
}
function changeplay() {
  var e = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    charCode: "0",
    code: "KeyK",
    key: "k",
    shiftKey: false,
    keyCode: 75,
  });
  document.dispatchEvent(e);
}

function speed(rangeSliderValue) {
  if (rangeSliderValue > initvalue) {
    var e = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      charCode: "0",
      code: "Period",
      key: ">",
      shiftKey: true,
      keyCode: 190,
    });
    document.dispatchEvent(e);
  } else {
    var e = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      charCode: "0",
      code: "Comma",
      key: "<",
      shiftKey: true,
      keyCode: 188,
    });
    document.dispatchEvent(e);
  }
  initvalue = rangeSliderValue;
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, _sender, sendResponse) {
  if (message === "stepback") {
    stepback();
  } else if (message === "stepfor") {
    stepfor();
  } else if (message === "leftbutton") {
    leftbutton();
  } else if (message === "rightbutton") {
    rightbutton();
  } else if (message === "upbutton") {
    upbutton();
  } else if (message === "downbutton") {
    downbutton();
  } else if (message === "caption") {
    caption();
  } else if (message === "search") {
    search();
  } else if (message === "screene") {
    screene();
  } else if (message === "vol") {
    vol();
  } else if (message === "changeplay") {
    changeplay();
  } else if (message === "changeselect") {
    changeselect();
  } else if (message === "changeback") {
    changeback();
  } else if (message === "volup") {
    volup();
  } else if (message === "voldown") {
    voldown();
  } else if (message === "panelscreen") {
    panelscreen();
  } else if (message === "videoscreen") {
    videoscreen();
  } else if (message === "youtube") {
    youtube();
  } else if (message.split(",")[0] == "speed") {
    speed(Number(message.split(",")[1]));
  } else if (message === "sendMeURL") {
    sendfirstinfo();
  } else if (message.split(",")[0] == "volume") {
    volumelevel = Number(message.split(",")[1]);
    console.log(volumelevel);
    console.log("Bring it on");
  } else if (message.split(",")[0] == "speedlevel") {
    initvalue = Number(message.split(",")[1]);
  }
}

var d = new Date();
console.log("Content Scripts Working " + d.toLocaleTimeString());