const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
}
let progressbar = document.querySelector("progress");
console.log(progressbar.value);

for (let i = 0; i <= 100; i++) {
    setTimeout(function(){progressbar.value=i;}, i*20);
}
setTimeout(function(){
    document.querySelector("form").submit();
}, 2500)