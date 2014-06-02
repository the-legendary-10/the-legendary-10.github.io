$(function() {
			$( "body>[data-role='panel']" ).panel();
		});

$(function () {
  $("[data-role=panel]").panel().enhanceWithin();
});

var dates = new Array();


function SaveMyTime(){	

	var myDate = new Object();
	
	//Read Values from input fields
	
	//convert Date in usable format
	//Datum wird um 1 reduziert, um eine Vergleichbarkeit mit today zu ermöglichen (JS fängt bei 0 an!)
	var unconvDate = $("#datefield").val();
	var Datum = unconvDate.split(".");
	var WhishedDate = new Date(Datum[2],Datum[1]-1,Datum[0],23,59,59);
		
	//get todays date
	var today = new Date();
			
	//check if data makes sense
	if((WhishedDate < today)){
		alert("Bitte ein Datum in der Zukunft auswählen!");
	}
	else{
	
		//convert times
		//Die Stunden werden um 2 erhöht, da beim serialisieren zum JSON Objekt die STunden um 2 reduziert werden
		var unconvFrom = $("#fromtime").val();
		var unconvFromPart = unconvFrom.split(":");
		var NewFromTime = new Date(Datum[2], Datum[1]-1, Datum[0], (parseInt(unconvFromPart[0])+2), unconvFromPart[1], "00");
		myDate.FromTime = NewFromTime;
		
		var unconvTo = $("#totime").val();
		var unconvToPart = unconvTo.split(":");
		var NewToTime = new Date(Datum[2], Datum[1]-1, Datum[0], (parseInt(unconvToPart[0])+2), unconvToPart[1], "00");	
		myDate.ToTime = NewToTime;
		
		//alert("Stunde: "+myDate.ToTime.getHours());
		//Check if Times and Dates make sense and are empty
		if ((myDate.FromTime== null) || (myDate.ToTime== null)){
			alert("Bitte Werte eintragen!");
			
		}else{
			
			//Check ob die Endzeit vor der Beginzeit liegt
			if(myDate.FromTime > myDate.ToTime){
				alert("Bitte die Zeiten anpassen");
				
			}else{
				
				//Create a new JSON Object containing the date and time values 
				var JSONdate = JSON.stringify(myDate);
				
				
				/*
				if there are already saved values, read them and append the new value, otherwise 
				just set old to the current JSON object
				*/
				var old = localStorage.getItem("dates");
				
				if(old!=null){
					old = old.substring(0, old.length-1) + "," + JSONdate + "]";
				}
				else{
					old= "[" + JSONdate + "]";
				}
				
				//save the values to localStorage
				localStorage.dates=old;
				
				//Minuten mit einer "0" auffüllen
				var fromMinutes = myDate.FromTime.getMinutes();
				fromMinutes = fromMinutes > 9 ? fromMinutes : '0' + fromMinutes;
				var toMinutes = myDate.ToTime.getMinutes();
				toMinutes = toMinutes > 9 ? toMinutes : '0' + toMinutes;
				
				//Ausgabe
				$( "#LastValues" ).append("am "+myDate.FromTime.getDate()+"."+(myDate.FromTime.getMonth()+1)+
				"."+myDate.FromTime.getUTCFullYear()+" von: "+(myDate.FromTime.getHours()-2)+":"+
				fromMinutes+" bis "+(myDate.ToTime.getHours()-2)+":"+toMinutes+
				"</p>");
			
			}
		}
	}	
}

$("#time-page").ready(function(){
	//if there are already saved values, display them
	if(localStorage.dates != null){
	
		//get dates from localStorage
		var dates=JSON.parse(localStorage.dates);
	
		if(dates != null){
					
			//Ausgabe
			$( "#LastValues" ).append("Die aktuell gespeicherten Werte sind:<br>");
			
			for (var i=0; i<dates.length; i++){
				//display the values
				var from = new Date(dates[i].FromTime);
				var to = new Date (dates[i].ToTime);
				
				//Minuten mit einer "0" auffüllen
				var fromMinutes = from.getMinutes();
				fromMinutes = fromMinutes > 9 ? fromMinutes : '0' + fromMinutes;
				var toMinutes = to.getMinutes();
				toMinutes = toMinutes > 9 ? toMinutes : '0' + toMinutes;
				
				$( "#LastValues" ).append("am "+from.getDate()+"."+(from.getMonth()+1)+"."+
				from.getUTCFullYear()+" von: "+(from.getHours()-2)+":"+fromMinutes+" bis "+(to.getHours()-2)+
				":"+toMinutes+"</p>");
			}
		}	

		//Textfelder mit den letzten Weerten befüllen
		$("#datefield").val(from.getDate()+"."+(from.getMonth()+1)+"."+from.getUTCFullYear());
		$("#fromtime").val((from.getHours()-2)+":"+from.getMinutes());
		$("#totime").val((to.getHours()-2)+":"+to.getMinutes());
	}
});
