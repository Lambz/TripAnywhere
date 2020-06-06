var mName;
var mEmail;
var mRoom;
var mNumRoom;
var mNumGuest;
var mRange;

function book()
{
    var cond = true;
    mName = document.getElementById("name").value;
    mEmail = document.getElementById("email").value;
    mRoom = document.getElementById("rooms").value;
    mNumRoom = document.getElementById("number1").value;
    mNumGuest = document.getElementById("number2").value;
    mRange = document.getElementById("date1").value;
    if(mName == "")
    {
        document.getElementById("name").style.borderBottom = "0.1em solid red";
        cond = false;
    }
    if(mEmail == "")
    {
        document.getElementById("email").style.borderBottom = "0.1em solid red";
        cond = false;
    }
    if(mRoom == "")
    {
        document.getElementById("rooms").style.borderBottom = "0.1em solid red";
        cond = false;
    }
    if(mNumRoom == "")
    {
        document.getElementById("number1").style.borderBottom = "0.1em solid red";
        cond = false;
    }
    if(mNumGuest == "")
    {
        document.getElementById("number2").style.borderBottom = "0.1em solid red";
        cond = false;
    }
    if(mRange == "")
    {
        document.getElementById("date1").style.borderBottom = "0.1em solid red";
        cond = false;
    }
    if(cond)
    {
        doDatabaseThings();
    }
}

function doDatabaseThings()
{
    window.indexedDB = window.indexedDB || window.mozIndexedBD || window.webkitIndexedDB || window.msIndexedDB;
    let request = window.indexedDB.open("Trip_Anywhere",1), db, tx, store, index;
    request.onupgradeneeded = function(e)
    {
        let db = request.result,
        store = db.createObjectStore("Flights",{autoIncrement: true});
    }
    
    request.onerror = function(e)
    {
        console.log("There was an error: "+e.target.errorCode);
    }

    request.onsuccess = function(e)
    {
        db = request.result;
        tx = db.transaction("hotels","readwrite");
        store = tx.objectStore("hotels");
        var user = sessionStorage.getItem("activeUser");
        db.onerror = function(e)
        {
            console.log("ERROR "+e.target.errorCode);
        }
        store.put({"name":mName,"email":mEmail,"room":mRoom,"numroom":mNumRoom,"numguest":mNumGuest,"range":mRange,"user":user});
        tx.oncomplete = function()
        {
            db.close();
            document.getElementById("formID").style.display = "none";
            document.getElementById("booking_confirmed").style.display = "block";
        }
    }
}