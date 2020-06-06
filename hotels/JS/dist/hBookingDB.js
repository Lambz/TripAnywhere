// creates databases for site
function createDb() {
    window.indexedDB = window.indexedDB || window.mozIndexedBD || window.webkitIndexedDB || window.msIndexedDB;
    let request = window.indexedDB.open("Trip_Anywhere",1), db, tx, store, index;


    // on success needed

  request.onsuccess = e => {
    db = request.result;
     tx = db.transaction("hotelss","readwrite");
    store = db.objectStore("hotelss");
    db.onerror = function(e)
    {
        console.log("ERROR "+e.target.errorCode);
    }
    addBooking(db);
    afterProceeding();
  }

  // on error

  request.onerror = e => {
    alert(`Error: Couldn't book your room. ErrorName: ${e.target.error.message}`);
  }
}
// store booking info to the DB
function addBooking(db) {
    // gets form data
      let cname = document.getElementById('name').value;
      let useremail = document.getElementById('email').value;
      let roomSelected = document.querySelector('input[name="inlinelable"]:checked').value;
      let num1 = document.getElementById('number1').value;
      let num2 = document.getElementById('number2').value;
    
    // defines a node for entry to db
      let hotelss = {
        email: useremail,
        name: cname,
        rooms: roomSelected,
        number1:num1 ,
        number2: num2
       
      };
  
    
      const addBooking = tx.objectStore("hotelss");
    // store booked room info 
    addBooking.add(hotelss);
      // adds user as active user to track
      sessionStorage.setItem("activeUser", hotelss.email);
    }
    // clears screen and shows homepage button and message
    function afterProceeding() {
      let page = `<h2>Room is booked Successfully</h2><br /><a href="./index.html">Back to homepage</a>`;
      document.querySelector('body').innerHTML = page;
    }