let progressbar = document.querySelector("progress");
// console.log(progressbar.value);

for (let i = 0; i <= 100; i++) {
  setTimeout(function () {
    progressbar.value = i;
  }, i * 15);
}
setTimeout(function () {
  document.querySelector("form").submit();
}, 2000);
