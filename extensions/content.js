var vidopanels;
var panelcounter;
let columnnum=1;
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
    panelcounter=0;
    videopanels=document.querySelectorAll("ytd-rich-item-renderer");
    videopanels[panelcounter].style.borderBottom="6px solid dodgerblue";
    let videomarginb=parseFloat(getComputedStyle(videopanels[panelcounter],null).getPropertyValue('margin-bottom').slice(0,-2));
    let newvideomarginb=videomarginb-6;
    videopanels[panelcounter].style.marginBottom=newvideomarginb+"px";
    videopanels[panelcounter].scrollIntoView({block:"center"});
    window.addEventListener("keydown", function(event) {
        videopanels=document.querySelectorAll("ytd-rich-item-renderer");   
        videopanels[panelcounter].style.borderBottom="none";
        videopanels[panelcounter].style.marginBottom=videomarginb+"px";
        if (event.code === "ArrowDown"){
            panelcounter+=columnnum;
        } else if (event.code === "ArrowUp"){   
            panelcounter-=columnnum;
        } else if (event.code === "ArrowLeft"){
            panelcounter-=1;
        } else if (event.code === "ArrowRight"){
            panelcounter+=1;
        }
        if (panelcounter<0){
            panelcounter=0;
        }
        videopanels[panelcounter].scrollIntoView({block:"center"});
        videomarginb=parseFloat(getComputedStyle(videopanels[panelcounter],null).getPropertyValue('margin-bottom').slice(0,-2));
        newvideomarginb=videomarginb-6;
        videopanels[panelcounter].style.marginBottom=newvideomarginb+"px";
        videopanels[panelcounter].style.borderBottom="6px solid dodgerblue";
    
        event.preventDefault();
        }, true);
}
if ((/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?(\/)?$/).test(window.location.href)){
    selectline();
}

console.log("Content Scripts Working");


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
function changeback(){
    window.history.back();    
}
function changeselect(){
    this.document.location=videopanels[panelcounter].querySelector("a").href;
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



chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, _sender, _sendResponse){
    if (message==="stepback"){
        stepback();
    }
    else if(message==="stepfor"){
        stepfor();
    }
    else if(message==="leftbutton"){
        leftbutton();
    }
    else if(message==="rightbutton"){
        rightbutton();
    }
    else if(message==="upbutton"){
        upbutton();
    }
    else if(message==="downbutton"){
        downbutton();
    }
    else if(message==="caption"){
        caption();
    }
    else if(message==="search"){
        search();
    }
    else if(message==="screene"){
        screene();
    }
    else if(message==="vol"){
        vol();
    }
    else if(message==="changeplay"){
        changeplay();
    }
    else if(message==="changeselect"){
        changeselect();
    }
    else if(message==="changeback"){
        changeback();
    }
}