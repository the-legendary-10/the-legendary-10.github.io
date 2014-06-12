/* 
* This file contains the AJAX-Polling Javascript Code, as well as
* the code for fetching data from the UI and rendering responses 
* back into the DOM
*/

/*
* Do an AJAX request whenever we open the HOME-screen
*/
$( document ).on( "pageinit", "#main-page", refreshHome);
$(document).ready( function(){
	$( "#main-page" ).on( "pageshow", refreshHome );
});

/*
* AJAX loading indicator
*/
$(document).ajaxStart(function(){
	$('#ajaxloader').show();
}).ajaxStop(function(){
	$('#ajaxloader').hide();
});

/*
* AJAX polling without error messages
*/
function refreshHome() {
	var ownPhone = localStorage.getItem("ownphone");
	var location = getLocation();
	var phoneNumbersMD5 = localStorage.getItem('group');
	var timeslots = localStorage.getItem('dates');
	if(ownPhone && location && phoneNumbersMD5 && timeslots){
		refresh();
	}
}

/*
* Do a request and render the result
*/
function refresh(){
	var requestData=createRequestData();
	if(requestData == undefined){
		return;
	}
	postRequest(requestData);
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
		alert("Bitte Standort angeben");
		return undefined;
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
			/*UNIX-timestamp*/
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
	var startTime;
	var endTime;
	$("#result_table > tbody").empty();
	
	/*create dates if we got something back*/
	if(json.timeslot){
		startTime = new Date(json.timeslot.startTime);
		endTime = new Date(json.timeslot.endTime);
		var timeSlotRepr = startTime.toLocaleDateString() + " | " + startTime.toLocaleTimeString().substring(0,5) + " - " + endTime.toLocaleTimeString().substring(0,5);
		$("#timeslot_heading").html(timeSlotRepr);
	}
	else{
		var timeSlotRepr = "Keine Übereinstimmung";
		$("#timeslot_heading").html(timeSlotRepr);
		return;
	}
	
	/*Render into #result_table*/
	json.subjects.forEach(function(subject){
		var contact = md5ToContact(subject);
		$("#result_table > tbody").append("<tr><td>"+contact.phoneNumber+"</td><td>"+contact.firstName+" "+contact.lastName +"</td></tr>");
	});
}


/*
* Convert an MD5-hashed phone number to a contact
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


