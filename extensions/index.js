
function apply(message){
    let params={
        active:true, 
        currentWindow:true
    }
    chrome.tabs.query(params, gotTab);
    function gotTab(tabs){
        chrome.tabs.sendMessage(tabs[0].id, message);
    }
}

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

document.getElementById("p").addEventListener("click",changeback);
document.getElementById("p1").addEventListener("click",change);
document.getElementById("p2").addEventListener("click",leftbutton);
document.getElementById("p3").addEventListener("click",rightbutton);
document.getElementById("p4").addEventListener("click",upbutton);
document.getElementById("p5").addEventListener("click",downbutton);
document.getElementById("p6").addEventListener("click",stepfor);
document.getElementById("p7").addEventListener("click",vol);
document.getElementById("p8").addEventListener("click",stepback);
document.getElementById("p9").addEventListener("click",search);
document.getElementById("p10").addEventListener("click",screene);
document.getElementById("p11").addEventListener("click",caption);

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
        apply("changeselect");
    }
    else {
        if(selectcounter%2==1){
            document.getElementById("p1").innerHTML="<i class='enabled fas fa-pause fa-2x'></i>";
        }
        else{
            document.getElementById("p1").innerHTML="<i class='enabled fas fa-play fa-2x'></i>";
        }
        apply("changeplay");
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
            apply("changeback");
        }
        volumecounter=0;
        selectcounter=0;
    }
}

function screene(){
    if (selectcounter>0){
        apply("screene");
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
        apply("vol");
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
        apply("stepback");   
    }
}
function stepfor(){
    if (selectcounter>0){
        apply("stepfor");        
    }
}

function leftbutton(){
    apply("leftbutton");
}
function rightbutton(){
    apply("rightbutton");
}
function upbutton(){
    apply("upbutton");
}
function downbutton (){
    apply("downbutton");
}

function caption(){
    if (selectcounter>0){
        apply("caption"); 
    }
}

function search(){
    if (screencounter%2==0){
        apply("search");   
    }
}

window.addEventListener("keydown", function(event) {
    console.log(event);
}, true);


console.log("Popup worked");
