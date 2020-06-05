
// Static dummy data for the search results
var routes = [{trainName: "Via Rail 003", src: "Toronto", dest: "Ottawa", duration: "3 hours"},
{trainName: "Via Rail 021", src: "Montreal" , dest: "Calgary", duration: "21 hours"},
{trainName: "Via Rail 112", src: "Vancouver", dest: "Waterloo", duration: "36 hours"},
{trainName: "Via Rail 091", src: "Edmonton", dest: "Oshawa", duration: "12 hours"},
{trainName: "Via Rail 023", src: "Hamilton", dest: "Montreal", duration: "15 hours"}
];

// method to be invoked on form submission
// stores seach results
let index = [];
searchTrains();
// invokes the data search on basis of the user input
// for desktop only

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

// searches the train data
function searchTrains() {
  // clears previous search results
  index = [];
  routes.forEach(function(node) {
    let x = node.src;
    let y = node.dest;
    let m = sessionStorage.getItem("source");
    let n = sessionStorage.getItem("destination");
    if(x.toUpperCase === m.toUpperCase && y.toUpperCase === n.toUpperCase) {
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
    header.innerHTML = `The results for trains between ${sessionStorage.getItem("source")} and ${sessionStorage.getItem("destination")}`;
    let msg = `<div id="result_cards">`;
    index.forEach(function(node) {
      // adds card to the html code
      let card = `<div class="card"><p class="card_head">Train# ${node.trainName}</p><br /><p class="card_body">Source: ${node.src}<br />
      Destination: ${node.dest}</p><p class="card_dest">Journey duration: ${node.duration}</p></div>`;
      msg += card;  
    }); 
    msg += "</div>";
    // sets the cards to div
    result.innerHTML = msg;
  }
  else {
    header.innerHTML = "Sorry! No trains found on this route."
  }
}