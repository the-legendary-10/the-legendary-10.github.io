/* 
* This file contains the AJAX-Polling Javascript Code
*/

$(document).ready( function(){
	//setInterval(refresh, 5000); --turned off temporarily
});

/*
* Meta function - gets called every X seconds
*/
function refresh(){
	var requestData=createRequestData();
	if(requestData == undefined){
		return;
	}
	postRequest(requestData);
	//renderResponse(JSON.parse('{"subjects":["B25BF7426FABCADF01103045FD7707CE"],"timeslot":{"startTime":1401390559163,"endTime":1401397759164}}'));
}

/*
* Reads values from localStorage and returns the 
* request data as an Object.
*/
function createRequestData(){
	/*Identity */
	var ownPhone = localStorage.getItem("ownphone");
	if(ownPhone == undefined){
		alert("Bitte Telefonnummer eingeben");
		return undefined;
	}
	var ownPhone = $.md5(ownPhone);
	
	/*Invitees */
	var phoneNumbersMD5 = localStorage.getItem('group');
	if(phoneNumbersMD5 == undefined || phoneNumbersMD5 == 0){
		alert("Bitte Kontaktgruppe erstellen");
		return undefined;
	}
	phoneNumbersArray = phoneNumbersMD5.split(",");
	
	/*Location */
	var location = getLocation();
	if(location == undefined){
	/* temporary change to work with location unavailable*/
	//	alert("Bitte Locationabfrage erlauben");
	//	return undefined;
		location = new Object();
		location.longitude = 80;
		location.latitude = 80;
	}

	/* Timeslots*/
	var timeslots = localStorage.getItem('dates');
	if(timeslots == undefined){
		alert("Bitte Zeitspanne definieren");
		return undefined;
	}
	timeslots = JSON.parse(timeslots);

	var resultSlots = new Array();
	timeslots.forEach(function(slot){
		startDate = new Date(slot.FromTime);
		endDate = new Date(slot.ToTime);
		resultSlots.push({
			startTime : startDate.getTime(),
			endTime : endDate.getTime(),
		});
	});

	var result = {
		identity : ownPhone,
		invitees : phoneNumbersArray,
		currentPosition : {
			longitude : location.longitude,
			latitude : location.latitude,
		},
		timeslots : resultSlots,
	};
	return result;
}

/*
* HTTP POST data via AJAX
*/
function postRequest(requestData){
	$.ajax({
		url : "http://141.83.68.32/mampf/",
		data : JSON.stringify(requestData),
		type : "POST",
		dataType : "json",
		contentType : "application/json",
		success : renderResponse,
	});
}

/*
* After getting the server response, renders the data into DOM
*/
function renderResponse(json){
	//console.log(json);
	$("#result_table > tbody").empty();
	var startTime = new Date(json.timeslot.startTime);
	var endTime = new Date(json.timeslot.startTime);
	json.subjects.forEach(function(subject){
		var contact = md5ToContact(subject);
		$("#result_table > tbody").append("<tr><td>"+contact.phoneNumber+"</td><td>"+contact.firstName+" "+contact.lastName +"</td>"+startTime.toLocaleString()+"<td>"+endTime.toLocaleString()+"</td></tr>");
	});
	
}


/*
* Converts an MD5-Hashed phone number to a contact
*/

function md5ToContact(md5number) {
	var contactObj;
  	$.each( contacts, function( i, contact ) {
  		if(md5number == $.md5(contact.phoneNumber)) {
  		
			contactObj = { 
				phoneNumber : contact.phoneNumber,
  		 		firstName : contact.firstName,
  				lastName : contact.lastName
			};  	
  		}
  });
  return contactObj;		
}


