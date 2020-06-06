// This is a indexedDb checker
// In case the db is not supported, it shows an alert to user

if(!window.indexedDB) {
  alert("Your browser does not support our website's storage system. You can continue browsing, but you won't be book any service from our site!");
}

// script logic here

// user previous data showing logic
// run while document loads
let msg = "";
let db = null;
// method to be invoked on form submission
// stores seach results
document.getElementById('mobile_search').addEventListener('click', getMobileQuery);
document.getElementById('desktop_search').addEventListener('click', getDesktopQuery);
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
    let userData = document.getElementById('result_cards');
    let cursor = e.target.result;
    if(cursor) {
      if(cursor.value.email === sessionStorage.getItem("activeUser")) {
        // adds the item to msg
        let card = `<div class="card_res"><p class="card_head">Train Name: 
        ${cursor.value.train}</p><br /><p class="card_body"><b>Source:</b> ${cursor.value.source}<br />
      <br /><b>Destination:</b> ${cursor.value.destination}</p><p class="card_dest"><br />
      <b>Date of Journey:</b> ${cursor.value.date}<br /><br /><b>Journey duration:</b> ${cursor.value.duration}</p></div>`;
        msg += card;
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

// invokes the data search on basis of the user input
function getMobileQuery() {
  // saves data to session storage
  src = document.getElementById('mobile_source').value;
  sessionStorage.setItem("source", src);
  document.getElementById('mobile_source').value = "";
  dest = document.getElementById('mobile_destination').value;
  sessionStorage.setItem("destination", dest);
  document.getElementById('mobile_destination').value = "";
  date = document.getElementById('mobile_date').value;
  sessionStorage.setItem("date", date);
  document.getElementById('mobile_date').value = "";
  window.location.href = "./search-result.html";
}

function getDesktopQuery() {
  // saves data to session storage
  src = document.getElementById('desktop_source').value;
  sessionStorage.setItem("source", src);
  document.getElementById('desktop_source').value = "";
  dest = document.getElementById('desktop_destination').value;
  sessionStorage.setItem("destination", dest);
  document.getElementById('desktop_destination').value = "";
  date = document.getElementById('desktop_date').value;
  sessionStorage.setItem("date", date);
  document.getElementById('desktop_date').value = "";
  window.location.href = "./search-result.html";
}
