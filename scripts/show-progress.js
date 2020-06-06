// to update the bar as form is filled
let progressBar = document.querySelector('progress');

if(!(document.getElementById("first_name").value.length === 0))   {
  progressBar.value += 20;
}

if(!(document.getElementById("last_name").value.length === 0))   {
  progressBar.value += 20;
}

if((document.getElementById("input[genders]:checked").value)   {
  progressBar.value += 20;
}

if(!(document.getElementById("email").value.length === 0))   {
  progressBar.value += 20;
}

if(!(document.getElementById("password").value.length === 0))   {
  progressBar.value += 20;
}