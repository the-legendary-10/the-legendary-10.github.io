/* 
* This file contains the AJAX-Polling Javascript Code
*/
$( document ).on( "pageinit", "#main-page", refreshHome);


$(document).ready( function(){
	$( "#main-page" ).on( "pageshow", refreshHome );
});

/*AJAX loading indicator*/
$(document).ajaxStart(function(){
	$('#ajaxloader').show();
}).ajaxStop(function(){
	$('#ajaxloader').hide();
});

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
			//startTime : startDate.toString(),
			//endTime : endDate.toString()
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
	//console.log(result);
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
	//console.log(json);
	$("#result_table > tbody").empty();
	
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
	
	json.subjects.forEach(function(subject){
		var contact = md5ToContact(subject);
		$("#result_table > tbody").append("<tr><td>"+contact.phoneNumber+"</td><td>"+contact.firstName+" "+contact.lastName +"</td></tr>");
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


