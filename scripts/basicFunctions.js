function capitalizeFirstLetter(string) 
{
	var str = "";
	var st = string.split(" ");
	st.forEach(element => {
        str += element.charAt(0).toUpperCase()+element.slice(1)+" ";
    });
    console.log(str);
	return str;
}

function getDateMonth(string)
{
    var d = new Date(string);
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    return d.getDate()+" "+month[d.getMonth()];
}

function getCarrierName(id, response)
{
    var carrier;
    response.Carriers.forEach(element => {
        //console.log("id: "+id+" element.CarrierId: "+element.CarrierId);
        if(id == element.CarrierId)
        {
            //console.log("returning: "+element.Name);
            carrier = element.Name;
        }
    });
    return carrier;
}

function getNotCarrierName(id, response)
{
    var carrier;
    response.Carriers.forEach(element => {
        //console.log("id: "+id+" element.CarrierId: "+element.CarrierId);
        if(id != element.CarrierId)
        {
            //console.log("returning: "+element.Name);
            carrier = element.Name;
        }
    });
    return carrier;
}

function getPlace(id, response)
{
    var place;
    response.Places.forEach(element => {
        if(id == element.PlaceId)
        {
            place = element.CityName;
        }
    });
    return place;
}