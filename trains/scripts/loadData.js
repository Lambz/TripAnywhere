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