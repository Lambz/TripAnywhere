let login = document.getElementById('login_button');
login.addEventListener('click', doLogin);
let db = null;

// function called for signup
function doLogin() {
  openDb();
  checkUser();
}

// fteches databases for site
function createDb() {
  const request = indexedDB.open("Trip_Anywhere", 1);

  // on success needed

  request.onsuccess = e => {
    db = e.target.result;
  }

  // on error

  request.onerror = e => {
    alert(`Error: Couldn't fetch records. ErrorName: ${e.target.error.message}`);
  }
}

// checks user credentials
function addUser() {
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
  let page = `<h2>Logged in Successfully</h2><br /><a href="./index.html">Back to homepage</a>`;
  document.querySelector('body').innerHTML = page;
}