$(function(){
	$("#popup-times").click( function(){
	//	alert("popup-times");
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
		var IdToEdit =$(this).attr('id');
		console.log("Aufrufende ID: "+IdToEdit);
		
		//dazugehörige Zeit laden
		var dates=JSON.parse(localStorage.dates);
		
//		var from = new Date(dates[IdToEdit].FromTime);
//		var to = new Date (dates[IdToEdit].ToTime);
//		console.log(from);
//		console.log(to);
		
		//Edit-Page öffnen, alte Zeit als Default-Werte
		//time-edit-page öffnen
		
		//Textfelder mit den letzten Werten befüllen
	/*	$("#datefield").val(from.getDate()+"."+(from.getMonth()+1)+"."+from.getUTCFullYear());
		$("#fromtime").val((from.getHours())+":"+from.getMinutes());
		$("#totime").val((to.getHours())+":"+to.getMinutes());
	*/		
		//Button Speichern erstellen
		
		/*
		Bei Druck auf Speichern, Test, ob sich Daten geändert haben:
		-> ja: Alte Daten löschen und durch neue Daten ersetzen
		-> nein: keine Änderungen an den Daten
		
		zurück auf Zeitenübersicht
		*/
});