$(function(){
	$("#popup-times").click( function(){
		console.log("popup-times");
	});

});

$(function() {
    $("#deleteConTimes").click( function() {
	//	alert("deletecontimes");
		
		var dates=JSON.parse(localStorage.dates);
		console.log(dates);
		
		//get element that should be deleted
		var idToDelete = $(".deleteTime").attr("id"); 
		console.log(idToDelete);
		
		//search element in list
		for (var i=0; i<dates.length; i++){
			
		}
		//delete element from list
		
		//write changes to localStorage
		
		//remove item from list view
		
		//reload view
	});
});


//Datum ändern 
$(document).on("pagecreate","#time-edit-page",function(){
	console.log("Datum ändern");
	//ID des Elements bekommen
	var IdToEdit =$(this).attr("id");
	console.log("Aufrufende ID: "+IdToEdit);
	
	//dazugehörige Zeit laden
	if((localStorage.dates!=null) && (localStorage.dates!= undefined)){
		console.log("Daten im LocalStorage vorhanden!");
		var dates=JSON.parse(localStorage.dates);
		
		//	var from = new Date(dates[IdToEdit].FromTime);
		//	var to = new Date (dates[IdToEdit].ToTime);
		//	console.log(from);
		//	console.log(to);
		
		//Textfelder mit den letzten Werten befüllen
	/*	$("#datefield").val(from.getDate()+"."+(from.getMonth()+1)+"."+from.getUTCFullYear());
		$("#fromtime").val((from.getHours())+":"+from.getMinutes());
		$("#totime").val((to.getHours())+":"+to.getMinutes());
	*/		
	
	}else{
		console.log("Keine Daten im LocalStorage vorhanden");
	}
});

function ChangeTime(){
	console.log("ChangeTime");
	//ID des Elements bekommen
	var IdToEdit =$(this).attr("id");
	console.log("Aufrufende ID: "+IdToEdit);
	
	//dazugehörige Zeit laden
	if((localStorage.dates!=null) && (localStorage.dates!= undefined)){
		console.log("Daten im LocalStorage vorhanden!");
		var dates=JSON.parse(localStorage.dates);
		
		//	var from = new Date(dates[IdToEdit].FromTime);
		//	var to = new Date (dates[IdToEdit].ToTime);
		//	console.log(from);
		//	console.log(to);
		
		//Textfelder mit den letzten Werten befüllen
	/*	$("#datefield").val(from.getDate()+"."+(from.getMonth()+1)+"."+from.getUTCFullYear());
		$("#fromtime").val((from.getHours())+":"+from.getMinutes());
		$("#totime").val((to.getHours())+":"+to.getMinutes());
	*/		
	
		/*
		Bei Druck auf Speichern, Test, ob sich Daten geändert haben:
		-> ja: Alte Daten löschen und durch neue Daten ersetzen
		-> nein: keine Änderungen an den Daten		
					
		//convert times
		var newDate = new Object();
		var Datum = unconvDate.split(".");
		
		var unconvFrom = $("#fromtime").val();
		var unconvFromPart = unconvFrom.split(":");
		var NewFromTime = new Date(Datum[2], Datum[1]-1, Datum[0], (parseInt(unconvFromPart[0])), unconvFromPart[1], "00");
		newDate.FromTime = NewFromTime;
		
		var unconvTo = $("#totime").val();
		var unconvToPart = unconvTo.split(":");
		var NewToTime = new Date(Datum[2], Datum[1]-1, Datum[0], (parseInt(unconvToPart[0])), unconvToPart[1], "00");	
		newDate.ToTime = NewToTime;
		
		if((from!=newDate.FromTime) || (to != newDate.ToTime)){
			console.log("Daten wurden geändert!");
			
			//neuen Datensatz abspeichern, alten Datensatz löschen
		}
		else{
			cosole.log("keine Änderung der Daten!");
		}
		zurück auf Zeitenübersicht
		*/
	}else{
		console.log("Keine Daten im LocalStorage vorhanden");
	}
}