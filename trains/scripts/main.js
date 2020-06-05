// This is a indexedDb checker
// In case the db is not supported, it shows an alert to user

if(!window.indexedDB) {
  alert("Your browser does not support our website's storage system. You can continue browsing, but you won't be book any service from our site!");
}

// script logic here

// user previous data showing logic
// run while document loads
let db = null;
// checks if any user logged in
if(sessionStorage.getItem("activeUser")) {
  openDb();
}
// opens db to check user bookings
function openDb() {
  const request = indexedDB.open("Trip_Anywhere", 1);

  request.onsuccess = e => {
    db = e.target.result;
    showData();
  }

  request.onerror = e => {
    alert(`Could not fetch records! Error: ${e.error.message}`);
  }
}
// shows data by checking the previous bookings if any
function showData() {
  const tx = db.transaction("trains");
  const dataChk = tx.objectStore("trains");
  let data = dataChk.openCursor();

  data.onsuccess = e => {
    // div where the data will be showed
    let userData = document.getElementsByClassName('user_data');
    let cursor = e.target.result;
    let msg = "";
    if(cursor) {
      if(cursor.value.email === sessionStorage.getItem("activeUser")) {
        // adds the item to msg
        msg = msg + cursor.value + "<br />";
        cursor.continue();
      }
      else {
        cursor.continue();
      }
    }
    // shows data if any
    userData.innerHTML = msg;
  }
}

// method to be invoked on form submission
// stores seach results
let index = [];
document.getElementById('mobile_search').addEventListener('click', getMobileQuery);
document.getElementById('desktop_search').addEventListener('click', getDesktopQuery);

// invokes the data search on basis of the user input
function getMobileQuery() {
  // saves data to session storage
  src = document.getElementById('mobile_source').value;
  sessionStorage.setItem("source", src);
  dest = document.getElementById('mobile_destination').value;
  sessionStorage.setItem("destination", dest);
  date = document.getElementById('mobile_date').value;
  sessionStorage.setItem("date", date);
  window.location.href = "./search-result.html";
}

function getDesktopQuery() {
  // saves data to session storage
  src = document.getElementById('desktop_source').value;
  sessionStorage.setItem("source", src);
  dest = document.getElementById('desktop_destination').value;
  sessionStorage.setItem("destination", dest);
  date = document.getElementById('desktop_date').value;
  sessionStorage.setItem("date", date);
  window.location.href = "./search-result.html";
}
