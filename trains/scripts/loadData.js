// Script for searching and generating results
// for search-result.html
// Static dummy data for the search results
var routes = [{trainName: "Via Rail 003", src: "Toronto", dest: "Ottawa", duration: "3 hours", id: "0"},
{trainName: "Via Rail 021", src: "Montreal" , dest: "Calgary", duration: "21 hours", id: "1"},
{trainName: "Via Rail 112", src: "Vancouver", dest: "Waterloo", duration: "36 hours", id: "2"},
{trainName: "Via Rail 091", src: "Edmonton", dest: "Oshawa", duration: "12 hours", id: "3"},
{trainName: "Via Rail 023", src: "Hamilton", dest: "Montreal", duration: "15 hours", id: "4"}
];

// method to be invoked on form submission
// stores seach results
let index = [];
document.getElementById('desktop_search').addEventListener('click', getDesktopQuery);
searchTrains();
// invokes the data search on basis of the user input
// for desktop only

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

// searches the train data
function searchTrains() {
  // clears previous search results
  index = [];
  routes.forEach(function(node) {
    if(node.src.toUpperCase() === sessionStorage.getItem("source").toUpperCase() &&
     node.dest.toUpperCase() === sessionStorage.getItem("destination").toUpperCase()) {
      index.push(node);
    }
  });
  showResult();
}
// shows the result if any
function showResult() {
  let header = document.getElementById('search_header');
  let result = document.getElementById("search_result");
  if(index) {
    header.innerHTML = `<p id="gen_header">The result for trains between ${sessionStorage.getItem("source").toUpperCase()}
     and ${sessionStorage.getItem("destination").toUpperCase()}</p>`;
    let msg = `<div id="result_cards">`;
    index.forEach(function(node) {
      // adds card to the html code
      let card = `<div class="card"><p class="card_head">Train Name: ${node.trainName}</p><br /><p class="card_body"><b>Source:</b> ${node.src}<br />
      <b>Destination:</b> ${node.dest}</p><p class="card_dest"><b>Journey duration:</b> ${node.duration}</p><button id=${node.id} onclick="getBooking(this.id)">Book Now</button></div>`;
      msg += card;  
    }); 
    msg += "</div>";
    // sets the cards to div
    result.innerHTML = msg;
  }
  else {
    header.innerHTML = `<p id="gen_header">Sorry! No trains found on this route.</p>`;
  }
}
// checks weather booking can be done or not
// sends the data of booked train to session storage
function getBooking(id) {
  if(!window.indexedDB) {
    alert("Your browser does not support our website's storage system. You can't book any service from our site!");
  }

  else {
    sessionStorage.setItem("selectedTrain", id);
    window.location.href = "./confirm-booking.html";
  }
}