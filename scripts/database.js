let signup = document.getElementById('signup_button');
signup.addEventListener('click', doSignup);
let db = null;

// function called for signup
function doSignup() {
  createDb();
  addUser();
  afterRegister();
}

// creates databases for site
function createDb() {
  const request = indexedDB.open("Trip_Anywhere", 1);

  // on upgrade needed

  request.onupgradeneeded = e => {
    db = e.target.result;
    db.createObjectStore("user", {keypath: "email"});
    db.createObjectStore("trains", {keypath: "bookingNo"});
    db.createObjectStore("flights", {keypath: "bookingNo"});
    db.createObjectStore("hotels", {keypath: "bookingNo"});
  }

  // on success needed

  request.onsuccess = e => {
    db = e.target.result;
  }

  // on error

  request.onerror = e => {
    alert(`Error: Couldn't register user. ErrorName: ${e.target.error.message}`);
  }
}

// adds user to the db
function addUser() {
// gets form data
  let firstName = document.getElementById('first_name').value;
  let lastName = document.getElementById('last_name').value;
  let useremail = document.getElementById('email').value;
  let gender = document.querySelector('input[name="genders"]:checked').value;
  let password = document.getElementById('password').value;
  // to show the message to user
  let msgDiv = document.getElementById('msgDiv');
// defines a node for entry to db
  let user = {
    email: useremail,
    fname: firstName,
    lname: lastName,
    gdr: gender,
    pwd: password
  };
// creates transaction
  const tx = db.transaction("user", "readwrite");
  tx.onerror = e => {
    msgDiv.innerHTML = "User alreadt exists!";
  }

  const userAdd = tx.objectStore("user");
// adds user 
  userAdd.add(user);
}
// clears screen and shows homepage button and message
function afterRegister() {
  let page = `<h2>User Registered Successfully</h2><br /><a href="./index.html">Back to homepage</a>`;
  document.querySelector('body').innerHTML = page;
}