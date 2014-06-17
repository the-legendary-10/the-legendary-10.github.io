document.addEventListener("deviceready", onDeviceReady, false);
var contacts = [
			 {firstName: "Simon", lastName: "Rech", phoneNumber: "4915142425248",},
			 {firstName: "Lisa", lastName: "Hanstein", phoneNumber: "49123654678",}, 
			 {firstName: "Patrick", lastName: "Heinze", phoneNumber: "4975454458",},    
			 {firstName: "Christian", lastName: "Müller", phoneNumber: "4933335678",}, 
			 {firstName: "Claudia", lastName: "Meier", phoneNumber: "49155555678",}, 
			 {firstName: "Daniel", lastName: "Stoll", phoneNumber: "49133333555678",}, 
			 {firstName: "Marc-Oliver", lastName: "Seidler", phoneNumber: "49166665678",}, 
			 {firstName: "Christoph", lastName: "Bey", phoneNumber: "4912777678",}, 
			 {firstName: "Nicolas", lastName: "Koch", phoneNumber: "49123888878",},
			 {firstName: "Philipp", lastName: "Schramm", phoneNumber: "49123999678",},
			 {firstName: "Ulrike", lastName: "Piontek", phoneNumber: "494101010678",},
			 {firstName: "Kevin", lastName: "Sandermann", phoneNumber: "49313131678",} 
			 ];
			 
function onDeviceReady(){
	var options = new ContactFindOptions();
	options.multiple=true;
	var fields = ["displayName", "name", "phoneNumbers"];
	navigator.contacts.find(fields, onSuccess, onError, options);
}
function isOnDevice(){
	return document.location.protocol == "file:";
}

function onSuccess(deviceContacts){
	contacts = [];
	for (var i = 0; i < deviceContacts.length; i++) {
		if(deviceContacts[i].phoneNumbers){
			contacts.push({
				firstName : deviceContacts[i].name.givenName ? deviceContacts[i].name.givenName : "",
				lastName : deviceContacts[i].name.familyName ? deviceContacts[i].name.familyName : "" ,
				phoneNumber : deviceContacts[i].phoneNumbers[0].value,
			});
		}
	}
}

function onError(){
	alert("Konnte Kontakte nicht auslesen");
}

