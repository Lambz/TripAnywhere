// This is a indexedDb checker
// In case the db is not supported, it shows an alert to user

if(!window.indexedDB) {
  alert("Your browser does not support our website's storage system. You can continue browsing, but you won't be able to login!");
}
else {
// login logic
// checks if already logged in
  if(sessionStorage.getItem("activeUser")) {
    // hides the rest of elements
    document.getElementById("login_form").style.display = "none";
    document.getElementById("signup").style.display = "none";
    // shows email of user on screen
    document.getElementById("usrname").innerHTML = sessionStorage.getItem("activeUser");
    document.getElementById("logout").addEventListener("click", logoutUser);
  }
  else {
    // flow for login
    document.getElementById("if_logged").style.display = "none";
    let login = document.getElementById('login_button');
    login.addEventListener('click', doLogin);
    document.getElementById("signupBtn").addEventListener("click", signupRdrct);
    let db = null;
  }
}

// logs out user
function logoutUser() {
  sessionStorage.removeItem("activeUser");
  window.location.href = "./index.html";
}

// fetches databases for site
function doLogin() {
  const request = indexedDB.open("Trip_Anywhere", 1);

  // on success needed

  request.onsuccess = e => {
    db = e.target.result;
    checkUser();
  }

  // on error

  request.onerror = e => {
    alert(`Error: Couldn't fetch records. ErrorName: ${e.target.error.message}`);
  }
}

// checks user credentials
function checkUser() {
// gets form data
  let useremail = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  // to show the message to user
  let msgDiv = document.getElementById('msgDiv');

// creates transaction
  const tx = db.transaction("user");
  const userChk = tx.objectStore("user");
  let data = userChk.openCursor();

  data.onsuccess = e => {
    let cursor = e.target.result;
    // checks if entry exists
    if(cursor) {
      if(cursor.key === useremail && cursor.value.pwd === password) {
        // sets user as active user
        sessionStorage.setItem("activeUser", useremail);
        afterLogin();
      }
    else {
      cursor.continue();
    }
    }
  }

}
// clears screen and shows homepage button and message
function afterLogin() {
  document.getElementById('email').value = "";
  document.getElementById('password').value = "";
  let page = `<h2>Logged in Successfully</h2><br /><a href="./index.html">Back to homepage</a>`;
  document.querySelector('body').innerHTML = page;
}

function signupRdrct() {
  window.location.href = "./signup.html";
}