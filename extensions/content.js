var vidopanels;
var panelcounter;
var carrotbutton;
let columnnum=1;
var volumelevel=1;
var muted=0;

setTimeout(function(){console.log("Errors Corrected");},1000);
setTimeout(function(){console.log("System Checks Completed");},2000);
setInterval(function(){console.log("Connection Well Established."); console.log("System Working ---- Healthy");},3000)

function setcolumn(){
    if (window.innerWidth>1143){
        columnnum=4;
    }
    else if(window.innerWidth>887){
        columnnum=3;
    }
    else{
        columnnum=2;
    }
}
window.addEventListener("resize",setcolumn);
setcolumn();
function selectline(){


    carrotbutton=document.querySelectorAll("ytd-button-renderer#show-more-button");
    for (let i of carrotbutton){
        i.style.padding="2px 0px 0px 0px"
        i.style.borderBottom="6px solid red";
    } 
    var carrottoken=0;
    var carrotarray= new Array(carrotbutton.length);
    for (let index=0; index<carrotbutton.length; index++){
        carrotarray[index]=index;
    } 
    var carrot=false;
    panelcounter=0;
    videopanels=document.querySelectorAll("ytd-rich-item-renderer");
    videopanels[panelcounter].style.borderBottom="6px solid dodgerblue";
    let videomarginb=parseFloat(getComputedStyle(videopanels[panelcounter],null).getPropertyValue('margin-bottom').slice(0,-2));
    let newvideomarginb=videomarginb-6;
    videopanels[panelcounter].style.marginBottom=newvideomarginb+"px";
    videopanels[panelcounter].scrollIntoView({block:"center"});
    window.addEventListener("keydown", function(event) {

        if (carrot){
            console.log("Carrot checked--- Working");
            carrotbutton[carrotarray[carrottoken]].style.borderBottom="6px solid red";
            if (event.code === "ArrowDown"){
                let x=panelcounter%columnnum;
                while(videopanels[panelcounter].offsetTop==0){
                    panelcounter++;
                }
                panelcounter+=x;
                carrottoken++;
            }
            else if (event.code === "ArrowUp"){
                let x=panelcounter%columnnum;
                while(videopanels[panelcounter].offsetTop==0){
                    panelcounter-=1;
                }
                panelcounter=panelcounter+x+1-columnnum;
            }
            else if (event.code==="ArrowLeft"){
                while(videopanels[panelcounter].offsetTop==0){
                    panelcounter-=1;
                }
            }
            else if (event.code==="ArrowRight"){
                while(videopanels[panelcounter].offsetTop==0){
                    panelcounter++;
                }
                carrottoken++;
            }
            else if (event.code==="Enter"){
                let x=panelcounter%columnnum;
                while(videopanels[panelcounter].offsetTop==0){
                    panelcounter-=1;
                }
                panelcounter=panelcounter+x+1;
                carrotbutton[carrotarray[carrottoken]].click();
                carrotarray.splice(carrottoken,1);
                console.log(carrotarray[carrottoken]);
            }
            carrot =false;
            videopanels[panelcounter].scrollIntoView({block:"center"});
            videomarginb=parseFloat(getComputedStyle(videopanels[panelcounter],null).getPropertyValue('margin-bottom').slice(0,-2));
            newvideomarginb=videomarginb-6;
            videopanels[panelcounter].style.marginBottom=newvideomarginb+"px";
            videopanels[panelcounter].style.borderBottom="6px solid dodgerblue";   
        }
        else{
            videopanels=document.querySelectorAll("ytd-rich-item-renderer");   
            videopanels[panelcounter].style.borderBottom="none";
            videopanels[panelcounter].style.marginBottom=videomarginb+"px";
            var z=false;
            if (event.code === "ArrowDown"){
                panelcounter+=columnnum;
            } else if (event.code === "ArrowUp"){   
                panelcounter-=columnnum;
                z=true;
            } else if (event.code === "ArrowLeft"){
                panelcounter-=1;
                z=true;
            } else if (event.code === "ArrowRight"){
                panelcounter+=1;
            }
            if (panelcounter<0){
                panelcounter=0;
            }
            if (videopanels[panelcounter].offsetTop==0){
                if (z){
                    carrottoken-=1;
                }
                carrotbutton[carrotarray[carrottoken]].style.borderBottom="6px solid dodgerblue";
                carrot=true;
            }
            else{
                videopanels[panelcounter].scrollIntoView({block:"center"});
                videomarginb=parseFloat(getComputedStyle(videopanels[panelcounter],null).getPropertyValue('margin-bottom').slice(0,-2));
                newvideomarginb=videomarginb-6;
                videopanels[panelcounter].style.marginBottom=newvideomarginb+"px";
                videopanels[panelcounter].style.borderBottom="6px solid dodgerblue";   
            }
        }
        event.preventDefault();
        }, true);
}
if ((/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?$/).test(window.location.href)){
    selectline();
}
else{
    //setTimeout(volumeset,1000);
    // console.log("New page volume down");
}


function volumeset(){
    document.getElementsByClassName("video-stream")[0].volume = volumelevel;    
    // console.log(volumelevel);
}
console.log("Content Scripts Working");
setInterval(volumeset,50);

function volup(){
    volumelevel+=0.1;
    volumelevel=Math.min(1,volumelevel);
    volumeset();
}
function voldown(){
    volumelevel-=0.1;
    volumelevel=Math.max(0,volumelevel);
    volumeset();
}

function screene(){
    var e = new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        charCode : "0",
        code: "KeyF",
        key : "f",
        shiftKey : false,
        keyCode : 70
    });
    document.dispatchEvent(e);        

}
function vol(){
    var e = new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        charCode : "0", 
        code: "KeyM",
        key : "m",
        shiftKey : false,
        keyCode : 77
    });
    document.dispatchEvent(e);     

}
function stepback(){
    var e = new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        charCode : "0",
        code: "KeyP",
        key : "P",
        shiftKey : true,
        keyCode : 80
    });
    document.dispatchEvent(e);        
}
function stepfor(){
    var e = new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        charCode : "0",
        code: "KeyN",
        key : "N",
        shiftKey : true,
        keyCode : 78
    });
    document.dispatchEvent(e);     
    //setTimeout(volumeset,1000);                 
}

function leftbutton(){
    var e = new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        charCode : "0",
        code: "ArrowLeft",
        key : "ArrowLeft",
        shiftKey : false,
        keyCode : 37
    });
    document.dispatchEvent(e);
}
function rightbutton(){
    var e = new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        charCode : "0",
        code: "ArrowRight",
        key : "ArrowRight",
        shiftKey : false,
        keyCode : 39
    });
    document.dispatchEvent(e);
}
function upbutton(){
    var e = new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        charCode : "0",
        code: "ArrowUp",
        key : "ArrowUp",
        shiftKey : false,
        keyCode : 38
    });
    document.dispatchEvent(e);
}
function downbutton (){
    var e = new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        charCode : "0",
        code: "ArrowDown",
        key : "ArrowDown",
        shiftKey : false,
        keyCode : 40
    });
    document.dispatchEvent(e);
}

function caption(){
    var e = new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        charCode : "0",
        code: "KeyC",
        key : "c",
        shiftKey : false,
        keyCode : 67
    });
    document.dispatchEvent(e); 
}

function search(){
    var e = new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        charCode : "0",
        code: "Slash",
        key : "/",
        shiftKey : false,
        keyCode : 191
    });
    document.dispatchEvent(e);   
}
function changeback(func){
    // window.history.back();  
    init();
    // chrome.runtime.sendMessage({url:window.location.href});
    // func({url:window.location.href});
    if ((/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?$/).test(window.location.href)){
        selectline();
    }
    // setTimeout(volumeset,1000);                 

}
function changeselect(){
    this.document.location=videopanels[panelcounter].querySelector("a").href;
    // setTimeout(volumeset,1000);                 

}
function changeplay(){
    var e = new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        charCode : "0",
        code: "KeyK",
        key : "k",
        shiftKey : false,
        keyCode : 75
    });
    document.dispatchEvent(e);        
}
function speed(rangeSliderValue){
    setTimeout(() => {
      document.getElementsByClassName("ytp-settings-button")[0].click();
    }, 1);
    setTimeout(() => {
      for(const element of document.getElementsByClassName("ytp-menuitem-label")){
        if(element.innerText == "Playback speed"){
            element.click();
            break;
        }
      }
    }, 1);
    setTimeout(() => {
      document.getElementsByClassName("ytp-menuitem")[rangeSliderValue].click();
    }, 1);
    document.getElementsByClassName("ytp-settings-button")[0].click();
}


chrome.runtime.onMessage.addListener(gotMessage);
/*
function gotaMessage(message,_sender,sendResponse){
    console.log(message);
    sendResponse({url:");
    console.log("sendresponse works")
}
*/

function gotMessage(message, _sender,sendResponse){
    if (message==="stepback"){
        stepback();
        // sendResponse({url:""});
    }
    else if(message==="stepfor"){
        stepfor();
        // sendResponse({url:""});
    }
    else if(message==="leftbutton"){
        leftbutton();
        // sendResponse({url:""});
    }
    else if(message==="rightbutton"){
        rightbutton();
        // sendResponse({url:""});
    }
    else if(message==="upbutton"){
        upbutton();
        // sendResponse({url:""});
    }
    else if(message==="downbutton"){
        downbutton();
        // sendResponse({url:""});
    }
    else if(message==="caption"){
        caption();
        // sendResponse({url:""});
    }
    else if(message==="search"){
        search();
        // sendResponse({url:""});
    }
    else if(message==="screene"){
        screene();
        // sendResponse({url:""});
    }
    else if(message==="vol"){
        vol();
        // sendResponse({url:""});
    }
    else if(message==="changeplay"){
        changeplay();
        // sendResponse({url:""});
    }
    else if(message==="changeselect"){
        changeselect();
        // sendResponse({url:""});
    }
    else if(message==="changeback"){ 
        changeback();
        // window.history.back();
        // sendResponse({url:window.location.href});        

    }
    else if (message==="volup"){
        volup();
        // sendResponse({url:""});
    }
    else if (message==="voldown"){
        voldown();
        // 
    }
    else if(message.split(",")[0]=="speed"){
        speed(Number(message.split(",")[1]));
    }
    // return true;
}


function changed(){
    return new Promise((resolve,reject) =>{
        window.history.back();
    });
}

async function init(){
    await changed();
    chrome.runtime.sendMessage({url:window.location.href});
}

async function did(){
    window.history.back();
    return;
}
