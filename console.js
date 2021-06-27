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
let newvideomarginb=videomarginb-6;
videopanels[panelcounter].style.marginBottom=newvideomarginb+"px";
videopanels[panelcounter].scrollIntoView({block:"center", behavior:"smooth"});
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
    if (panelcounter<0){
        panelcounter=0;
    }
    videopanels[panelcounter].scrollIntoView({block:"center", behavior:"smooth"});
    videomarginb=parseFloat(getComputedStyle(videopanels[panelcounter],null).getPropertyValue('margin-bottom').slice(0,-2));
    newvideomarginb=videomarginb-6;
    videopanels[panelcounter].style.marginBottom=newvideomarginb+"px";
    videopanels[panelcounter].style.borderBottom="6px solid dodgerblue";

    event.preventDefault();
    // console.log(panelcounter);
    }, true);
