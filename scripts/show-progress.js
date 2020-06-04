// hides progress bar if not supported by browser

if(!Modernizr.progress) {
  document.querySelector('progress').style.display = "none";
}