// This is a indexedDb checker
// In case the db is not supported, it shows an alert to user

if(!window.indexedDB) {
  alert("Your browser does not support our website's storage system. You can continue browsing, but you won't be book any service from our site!");
}

// Static dummy data for the search results
var routes = [{trainName: "Via Rail 003", src: "Toronto", dest: "Ottawa", duration: "3 hours"},
{trainName: "Via Rail 021", src: "Montreal" , dest: "Calgary", duration: "21 hours"},
{trainName: "Via Rail 112", src: "Vancouver", dest: "Waterloo", duration: "36 hours"},
{trainName: "Via Rail 091", src: "Edmonton", dest: "Oshawa", duration: "12 hours"},
{trainName: "Via Rail 023", src: "Hamilton", dest: "Montreal", duration: "15 hours"}
];

// method to be invoked on form submission

document.getElementById('mobile_search').addEventListener('click', searchTrains);

function searchTrains() {
  src = document.getElementById('source').value;
  dest = document.getElementById('destination').value;
  date = document.getElementById('date').value;
  window.location.href = "../search-result.html";
  console.log(src);
}