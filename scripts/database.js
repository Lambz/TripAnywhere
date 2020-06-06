// This is a indexedDb checker
// In case the db is not supported, it shows an alert to user

if (!window.indexedDB) {
	alert("Your browser does not support our website's storage system. You can continue browsing, but you won't be able to signup!");
}
else {
	let signup = document.getElementById('signup_button');
	signup.addEventListener('click', createDb);
}


// creates databases for site
function createDb() {

	var cond = true;
	let firstName = document.getElementById('first_name').value;
	let lastName = document.getElementById('last_name').value;
	let useremail = document.getElementById('email').value;
	let gender = document.querySelector('input[name="genders"]:checked').value;
	let password = document.getElementById('password').value;

	if (firstName == "") {
		document.getElementById('first_name').style.borderBottom = "0.1em solid red";
		cond = false;
	}
	if (lastName == "") {
		document.getElementById('last_name').style.borderBottom = "0.1em solid red";
		cond = false;
	}
	if (useremail == "") {
		document.getElementById('email').style.borderBottom = "0.1em solid red";
		cond = false;
	}
	if (password == "") {
		document.getElementById('password').style.borderBottom = "0.1em solid red";
		cond = false;
	}

	if (cond) {

		window.indexedDB = window.indexedDB || window.mozIndexedBD || window.webkitIndexedDB || window.msIndexedDB;
		let request = window.indexedDB.open("Trip_Anywhere", 1), db, tx, store, index;

		request.onerror = function (e) {
			console.log("There was an error: " + e.target.errorCode);
		}

		request.onsuccess = function (e) {
			db = request.result;
			tx = db.transaction("user", "readwrite");
			store = tx.objectStore("user");
			db.onerror = function (e) {
				console.log("ERROR " + e.target.errorCode);
			}
			store.put({ "email": useremail, "fname": firstName, "lname": lastName, "gdr": gender, "pwd": password});
			tx.oncomplete = function () {
				db.close();
				sessionStorage.setItem("activeUser", useremail);
				sessionStorage.setItem("fname",firstName);
				afterRegister();
			}
	
			tx.onerror = function(e)
			{
				document.getElementById("user_already_exists").style.display = "block";
			}
		}
		
	}



	// window.indexedDB = window.indexedDB || window.mozIndexedBD || window.webkitIndexedDB || window.msIndexedDB;
	// let request = window.indexedDB.open("Trip_Anywhere", 1), db, tx, store, index;

	// request.onsuccess = function (e) 
	// {
	// 	db = request.result;
	// 	tx = db.transaction("user", "readwrite");
	// 	store = tx.objectStore("user");
	// 	db.onerror = function (e) {
	// 		console.log("ERROR " + e.target.errorCode);
	// 	}

	// 	let msgDiv = document.getElementById('msgDiv');
	// 	// defines a node for entry to db
	// 	let user = {
	// 		email: useremail,
	// 		fname: firstName,
	// 		lname: lastName,
	// 		gdr: gender,
	// 		pwd: password
	// 	};
	// 	// creates transaction
	// 	const tx = db.transaction("user", "readwrite");
	// 	tx.onerror = e => 
	// 	{
	// 		document.getElementById("user_already_exists").style.display = "block";
	// 	}

	// 	const userAdd = tx.objectStore("user");
	// 	// adds user 
	// 	userAdd.add(user);
	// 	// adds user as active user to track
	// 	sessionStorage.setItem("activeUser", user.email);
	// 	sessionStorage.setItem("fname",user.fname);

	// 	// addUser(db);
	// 	// afterRegister();
	// }

	// // on error

	// request.onerror = e => {
	// 	alert(`Error: Couldn't register user. ErrorName: ${e.target.error.message}`);
	// }
}

// // adds user to the db
// function addUser(db) {
// 	// gets form data

// 	// to show the message to user
// 	let msgDiv = document.getElementById('msgDiv');
// 	// defines a node for entry to db
// 	let user = {
// 		email: useremail,
// 		fname: firstName,
// 		lname: lastName,
// 		gdr: gender,
// 		pwd: password
// 	};
// 	// creates transaction
// 	const tx = db.transaction("user", "readwrite");
// 	tx.onerror = e => {
// 		msgDiv.innerHTML = "User already exists!";
// 	}

// 	const userAdd = tx.objectStore("user");
// 	// adds user 
// 	userAdd.add(user);
// 	// adds user as active user to track
// 	sessionStorage.setItem("activeUser", user.email);
// }
// clears screen and shows homepage button and message
function afterRegister() {
	// let page = `<h2>User Registered Successfully</h2><br /><a href="./index.html">Back to homepage</a>`;
	// document.querySelector('body').innerHTML = page;
	document.getElementById("signup_successful").style.display = "block";
	window.setTimeout(function () {
		window.location.href = "index.html";
	}, 2000);
}