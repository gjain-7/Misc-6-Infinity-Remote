const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); //add this
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); //add this
    }    
}
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}
var selectcounter=0;
var screencounter=0; 
var volumecounter=0;

document.getElementById("p").className="disabled fas fa-arrow-left fa-3x";
document.getElementById("p6").innerHTML="<i class='disabled fas fa-step-forward fa-2x'></i>";
document.getElementById("p6").className="button2 step-forward";
document.getElementById("p7").innerHTML="<i class='disabled fas fa-volume-mute fa-2x'></i>";
document.getElementById("p7").className="button2 mute";
document.getElementById("p8").innerHTML="<i class='disabled fas fa-step-backward fa-2x'></i>";
document.getElementById("p8").className="button2 step-backward";
document.getElementById("p10").innerHTML="<i class='disabled fas fa-expand fa-2x'></i>";
document.getElementById("p10").className="button2 expand";
document.getElementById("p11").innerHTML="<i class='disabled fas fa-closed-captioning fa-2x'></i>";
document.getElementById("p11").className="button2 caption";

function change(){
    if (selectcounter==0){
        document.getElementById("p1").innerHTML="<i class='enabled fas fa-play fa-2x'></i>";
        document.getElementById("p2").innerHTML="<i class='enabled fas fa-backward fa-2x'></i>";
        document.getElementById("p3").innerHTML="<i class='enabled fas fa-forward fa-2x'></i>";
        document.getElementById("p4").innerHTML="<i class='enabled fas fa-volume-up fa-2x'></i>";
        document.getElementById("p5").innerHTML="<i class='enabled fas fa-volume-down fa-2x'></i>";
        document.getElementById("p").className="enabled fas fa-arrow-left fa-3x";
        document.getElementById("p6").innerHTML="<i class='enabled fas fa-step-forward fa-2x'></i>";
        document.getElementById("p6").className="button1 step-forward";
        document.getElementById("p7").innerHTML="<i class='enabled fas fa-volume-mute fa-2x'></i>";
        document.getElementById("p7").className="button1 mute";
        document.getElementById("p8").innerHTML="<i class='enabled fas fa-step-backward fa-2x'></i>";
        document.getElementById("p8").className="button1 step-backward";
        document.getElementById("p10").innerHTML="<i class='enabled fas fa-expand fa-2x'></i>";
        document.getElementById("p10").className="button1 expand";
        document.getElementById("p11").innerHTML="<i class='enabled fas fa-closed-captioning fa-2x'></i>";
        document.getElementById("p11").className="button1 caption";
        var e = new KeyboardEvent("keydown", {
            bubbles : true,
            cancelable : true,
            charCode : "0",
            code: "Enter",
            key : "Enter",
            shiftKey : false,
            keyCode : 13
        });
        document.dispatchEvent(e);
    }
    else {
        if(selectcounter%2==1){
            document.getElementById("p1").innerHTML="<i class='enabled fas fa-pause fa-2x'></i>";
        }
        else{
            document.getElementById("p1").innerHTML="<i class='enabled fas fa-play fa-2x'></i>";
        }
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
    selectcounter=selectcounter+1;
}

function changeback(){
    if (screencounter%2==0){
        document.getElementById("p1").innerHTML="Select";
        document.getElementById("p2").innerHTML="<i class='enabled fas fa-chevron-left fa-2x'></i>";
        document.getElementById("p3").innerHTML="<i class='enabled fas fa-chevron-right fa-2x'></i>";
        document.getElementById("p4").innerHTML="<i class='enabled fas fa-chevron-up fa-2x'></i>";
        document.getElementById("p5").innerHTML="<i class='enabled fas fa-chevron-down fa-2x'></i>";
        document.getElementById("p").className="disabled fas fa-arrow-left fa-3x";
        document.getElementById("p6").innerHTML="<i class='disabled fas fa-step-forward fa-2x'></i>";
        document.getElementById("p6").className="button2 step-forward";
        document.getElementById("p7").innerHTML="<i class='disabled fas fa-volume-mute fa-2x'></i>";
        document.getElementById("p7").className="button2 mute";
        document.getElementById("p8").innerHTML="<i class='disabled fas fa-step-backward fa-2x'></i>";
        document.getElementById("p8").className="button2 step-backward";
        document.getElementById("p10").innerHTML="<i class='disabled fas fa-expand fa-2x'></i>";
        document.getElementById("p10").className="button2 expand";
        document.getElementById("p11").innerHTML="<i class='disabled fas fa-closed-captioning fa-2x'></i>";
        document.getElementById("p11").className="button2 caption";
        if (selectcounter>0){
//             window.history.back();
            console.log("hi");
        }
        volumecounter=0;
        selectcounter=0;
    }
}

function screen(){
    if (selectcounter>0){
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
        if (screencounter%2==0){
            document.getElementById("p10").innerHTML="<i class='enabled fas fa-compress fa-2x'></i>";
            document.getElementById("p").className="disabled fas fa-arrow-left fa-3x";
            document.getElementById("p9").innerHTML="<i class='disabled fas fa-search fa-2x'></i>";
            document.getElementById("p9").className="button2 search";
        }
        else{
            document.getElementById("p10").innerHTML="<i class='enabled fas fa-expand fa-2x'></i>";
            document.getElementById("p").className="enabled fas fa-arrow-left fa-3x";
            document.getElementById("p9").innerHTML="<i class='enabled fas fa-search fa-2x'></i>";
            document.getElementById("p9").className="button1 search";

        }
        screencounter=screencounter+1;
    }
}

function vol(){
    if (selectcounter>0){
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
        if (volumecounter%2==0){
            document.getElementById("p7").innerHTML="<i class='enabled fas fa-volume-up fa-2x'></i>";
        }
        else{
            document.getElementById("p7").innerHTML="<i class='enabled fas fa-volume-mute fa-2x'></i>";
        }
        volumecounter+=1;
    }
}

function stepback(){
    if (selectcounter>0){
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
}
function stepfor(){
    if (selectcounter>0){
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
    if (selectcounter>0){
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
}

function search(){
    if (screencounter%2==0){
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
}

window.addEventListener("keydown", function(event) {
    console.log(event);
}, true);

/*
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
window.addEventListener("resize",setcolumn );
setcolumn();
let panelcounter=0;
var videopanels=document.querySelectorAll("ytd-rich-item-renderer");
videopanels[panelcounter].style.borderBottom="6px solid dodgerblue";
let videomarginb=parseFloat(getComputedStyle(videopanels[panelcounter],null).getPropertyValue('margin-bottom').slice(0,-2));
let videoborderb=parseFloat(getComputedStyle(videopanels[panelcounter],null).getPropertyValue('border-bottom').slice(0,-2));
let videoheight=videopanels[panelcounter].offsetHeight;
let h=videomarginb+videoheight+videoborderb;
let newvideomarginb=videomarginb-6;
videopanels[panelcounter].style.marginBottom=newvideomarginb+"px";
window.addEventListener("keydown", function(event) {
    var videopanels=document.querySelectorAll("ytd-rich-item-renderer");   
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
    if(panelcounter%columnnum==0){
        // this.scrollTo
    }
    videomarginb=parseFloat(getComputedStyle(videopanels[panelcounter],null).getPropertyValue('margin-bottom').slice(0,-2));
    newvideomarginb=videomarginb-6;
    videopanels[panelcounter].style.marginBottom=newvideomarginb+"px";
    videopanels[panelcounter].style.borderBottom="6px solid dodgerblue";
    event.preventDefault();
    // console.log(panelcounter);
    }, true);
*/
