/* 
* This file contains the AJAX-Polling Javascript Code
*/

$(document).ready( function(){
	//TODO - load LocalStorage data into UI
	setInterval(refresh, 5000);
});

/*
* Meta function - gets called every X seconds
*/
function refresh(){
	var requestData=createRequestData();
	postRequest(requestData);
	//renderResponse(JSON.parse('{"subjects":["B25BF7426FABCADF01103045FD7707CE"],"timeslot":{"startTime":1401390559163,"endTime":1401397759164}}'));
}

/*
* Reads values from UI-elements and returns the 
* request data as an Object.
*/
function createRequestData(){
	/*
	*TODO -- dummy function
	*remember md5'ing phone numbers
	*/
	return JSON.parse('{"identity":"A559EF3AB440F83CA0E0B42D6F1A20CA","invitees":["B25BF7426FABCADF01103045FD7707CE","A9B9D2ED66A5DA2AFB3247F6947F5591"],"currentPosition":{"longitude":9.170299499999999,"latitude":48.773556600000006},"timeslots":[{"startTime":1401377098763,"endTime":1401384298763},{"startTime":1401384298763,"endTime":1401391498763}]}');
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
	console.log(json);
	$("#result_table > tbody").empty();
	json.subjects.forEach(function(subject){
		var contact = md5ToContact(subject);
		//TODO: Timeslot(s)?
		$("#result_table > tbody").append("<tr><td>"+contact.phoneNumber+"</td><td>"+contact.name+"</td><td></td></tr>");
	});
}
/*
* Converts an MD5-Hashed phone number to a contact
*/
function md5ToContact(md5){
	//TODO
	return {phoneNumber : md5, name : "Testperson"};
}
