// This is a indexedDb checker
// In case the db is not supported, it shows an alert to user

if (!window.indexedDB) {
	alert("Your browser does not support our website's storage system. You can continue browsing, but you won't be able to login!");
}
else {
	// login logic
	// checks if already logged in
	if (sessionStorage.getItem("activeUser")) {
		// hides the rest of elements
		document.getElementById("login_success").style.display = "none";
		document.getElementById("if_logged").style.display = "block";
		document.getElementById("login_div").style.display = "none";
		// shows email of user on screen
		document.getElementById("usrname").innerHTML = sessionStorage.getItem("activeUser");
		document.getElementById("logout").addEventListener("click", logoutUser);
	}
	else {
		// flow for login
		document.getElementById("if_logged").style.display = "none";
		let login = document.getElementById('login_button');
		login.addEventListener('click', doLogin);
		let db = null;
	}
}

// logs out user
function logoutUser() {
	// sessionStorage.removeItem("activeUser");
	sessionStorage.clear();
	window.location.href = "./index.html";
}

// fetches databases for site
function doLogin() {
	var cond = true;
	let useremail = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	if (useremail == "") {
		document.getElementById('email').style.borderBottom = "0.1em solid red";
		cond = false;
	}
	if (password == "") {
		document.getElementById('password').style.borderBottom = "0.1em solid red";
		cond = false;
	}
	if (cond) 
	{
		window.indexedDB = window.indexedDB || window.mozIndexedBD || window.webkitIndexedDB || window.msIndexedDB;
		let request = window.indexedDB.open("Trip_Anywhere", 1), db, tx, store, index;

		request.onerror = function (e) {
			console.log("There was an error: " + e.target.errorCode);
		}

		request.onsuccess = function (e) {
			cond1 = true;
			db = request.result;
			tx = db.transaction("user", "readonly");
			store = tx.objectStore("user");
			db.onerror = function (e) {
				console.log("ERROR " + e.target.errorCode);
			}
			var allrecords = store.getAll();
			allrecords.onsuccess = function () {
				var n = allrecords.result.length;
				for (i = 0; i < n; i++) {
					if (allrecords.result[i].email == useremail && allrecords.result[i].pwd == password) {
						sessionStorage.setItem("activeUser", useremail);
						sessionStorage.setItem("fname", allrecords.result[i].fname)
						afterLogin();
						cond1 = false;
						break;
					}
				}

				if (cond1) {
					document.getElementById("login_inavlid").style.display = "block";
				}
			}
		}
	}
}

// clears screen and shows homepage button and message
function afterLogin() {
	document.getElementById("login_success").style.display = "block";
	document.getElementById("if_logged").style.display = "block";
	document.getElementById("login_div").style.display = "none";
	document.getElementById("usrname").innerHTML = sessionStorage.getItem("activeUser");
	window.setTimeout(function()
	{
        window.location.href = "index.html";
    }, 2000);
}

function signupbtnClicked() {
	window.location.href = "signup.html";
}
