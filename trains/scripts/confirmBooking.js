// Static dummy data for the search results
var routes = [{trainName: "Via Rail 003", src: "Toronto", dest: "Ottawa", duration: "3 hours", id: "0"},
{trainName: "Via Rail 021", src: "Montreal" , dest: "Calgary", duration: "21 hours", id: "1"},
{trainName: "Via Rail 112", src: "Vancouver", dest: "Waterloo", duration: "36 hours", id: "2"},
{trainName: "Via Rail 091", src: "Edmonton", dest: "Oshawa", duration: "12 hours", id: "3"},
{trainName: "Via Rail 023", src: "Hamilton", dest: "Montreal", duration: "15 hours", id: "4"}
];
// code for the search bar desktop mode
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

// script logic here
let db = null;
let booked = 0;
document.getElementById('desktop_search').addEventListener('click', getDesktopQuery);
document.getElementById("bookTicket").addEventListener('click', bookTicket);
confirmDetails();

function confirmDetails() {
  booked = routes[parseInt(sessionStorage.getItem("selectedTrain"))];
  document.getElementById("srcName").innerHTML = booked.src;
  document.getElementById("destName").innerHTML = booked.dest;
  document.getElementById("date").innerHTML = sessionStorage.getItem("date");
  document.getElementById("duration").innerHTML = booked.duration; 
}

function bookTicket() {
  if(sessionStorage.getItem("activeUser")) {
    openDb();
  }
  else {
    alert("Please login before booking the tickets!")
  }
}

// opens db to add user booking
function openDb() {
  const request = indexedDB.open("Trip_Anywhere", 1);

  request.onsuccess = e => {
    db = e.target.result;
    addData();
  }

  request.onerror = e => {
    alert(`Could not book ticket! Error: ${e.error.message}`);
  }
}

// adds data to db
function addData() {
  const tx = db.transaction("trains", "readwrite");
  const addTrain = tx.objectStore("trains");

  let entry = {
    train: booked.trainName,
    source: booked.src,
    destination: booked.dest,
    date: sessionStorage.getItem("date"),
    duration: booked.duration,
    msg: document.getElementById("instr").value,
    email: sessionStorage.getItem("activeUser")
  };

  addTrain.add(entry);
  // confirmation message shown
  document.getElementById("instr").value = "";
  document.querySelector('main').innerHTML = "";
  // loads up page after that
  window.location.href = "./index.html";
}

