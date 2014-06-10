
//------------------------------------------------------------------------------
// Function defines text that should appear in the popup after clicking on a delete icon

$(function() {
	$("body").on("click", ".deleteTime",function(e) {	
		// get id of list item
		var idListItem = $(this).parent().attr("id");

		//append text to popup
		// id = P (Praefix) + idListItem, since an ID should be unique in an HTML-Document and idListItem is already used 
		var text = '<p class="delTime" + id="P' + idListItem + '">Möchtest du die Zeit <b>' + $(this).parent().text() + ' </b>entfernen?</p>';
		            
		$("#popup-content-times").append(text);
    });    
}); 


//------------------------------------------------------------------------------
// Removes individual text in the popup after closing the popup
$(function() {
	$( "#popup-times" ).bind({popupafterclose: function(event, ui) {
			$(".delTime").remove();        
	}});
}); 



//------------------------------------------------------------------------------
// Function for displaying information message, if no contacts are available 

$.infoTimeMessage = function() { 
			$('#time-content-info').append('<div class="infobox" id="time-content-msg" ><b>Hinweis:</b> <br/> Aktuell hast Du <b>keine Zeiten</b> angelegt. Erstelle Zeiten über den Button "Hinzufügen".</div'); 					
}

//------------------------------------------------------------------------------
// Function for saving new times 
 
var dates = new Array();
var idcounter=0;

function SaveMyTime(){	

	var myDate = new Object();
	
	//Read Values from input fields
	
	//convert Date in usable format
	//Datum wird um 1 reduziert, um eine Vergleichbarkeit mit today zu ermöglichen (JS fängt bei 0 an!)
	var unconvDate = $("#datefield").val();

	if((unconvDate != undefined) && (unconvDate !="")){
		var Datum = unconvDate.split(".");
		var WhishedDate = new Date(Datum[2],Datum[1]-1,Datum[0],23,59,59);
			
		//get todays date
		var today = new Date();
				
		//check if data makes sense
		if((WhishedDate < today)){
			alert("Bitte heutiges Datum oder ein Datum in der Zukunft auswählen!");
			event.preventDefault();
		}
		else{	
			//convert times
			var unconvFrom = $("#fromtime").val();
			var unconvFromPart = unconvFrom.split(":");
			var NewFromTime = new Date(Datum[2], Datum[1]-1, Datum[0], (parseInt(unconvFromPart[0])), unconvFromPart[1], "00");
			myDate.FromTime = NewFromTime;
			
			var unconvTo = $("#totime").val();
			var unconvToPart = unconvTo.split(":");
			var NewToTime = new Date(Datum[2], Datum[1]-1, Datum[0], (parseInt(unconvToPart[0])), unconvToPart[1], "00");	
			myDate.ToTime = NewToTime;
			
			//alert("Stunde: "+myDate.ToTime.getHours());
			//Check if Times and Dates make sense and are empty
			if ((myDate.FromTime== null) || (myDate.ToTime== null) || (myDate.FromTime == undefined)  || (myDate.ToTime == undefined)){
				alert("Bitte Werte eintragen!");
				event.preventDefault();
				
			}else{
				
				//Check ob die Endzeit vor der Beginzeit liegt
				if(myDate.FromTime > myDate.ToTime){
					alert("Bitte die Zeiten anpassen");
					event.preventDefault();
					
				}else{
					if((((myDate.ToTime-myDate.FromTime)/1000)/60)<45){
						alert("Bitte nehmen Sie sich mindestens 45 min Zeit zum Essen!");
						event.preventDefault();
					}
					else{
					
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
						$( "#time-over-list" ).append('<li id="'+ idcounter +'" class="editTime"><a class="read-only-list-time" href="#time-edit-page" > '+myDate.FromTime.getDate()+'.'+(myDate.FromTime.getMonth()+1)+'.'+myDate.FromTime.getUTCFullYear()+' von '+(myDate.FromTime.getHours())+':'+fromMinutes+' bis '+(myDate.ToTime.getHours())+':'+toMinutes+'</a><a href="#popup-times" class="deleteTime" data-rel="popup"  data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn ui-corner-all ui-shadow ui-btn-inline" data-icon="delete" data-iconpos="right" id="'+ idcounter +'">Delete</a></li>');
						idcounter++;
						
						// Remove information message, if visible
						$('#time-content-msg').remove(); 
						
						$('#time-over-list').listview('refresh');
					}
				}
			}
		}
	}else{
		alert("Datum ist nicht definiert!");
	}
}



//------------------------------------------------------------------------------
// Function defines action after clicking on an existing time (class = editTime)

$(function() {
	$("body").on("click", ".editTime",function(e) {

		var idNumber = $(this).attr("id");
		console.log("idNumber: "+idNumber);
	         		
		var dates=JSON.parse(localStorage.dates);

		var from = new Date(dates[idNumber].FromTime);
		var to = new Date (dates[idNumber].ToTime);
			
			
		//Minuten mit einer "0" auffüllen
		var fromMinutes = from.getMinutes();
		fromMinutes = fromMinutes > 9 ? fromMinutes : '0' + fromMinutes;
		var toMinutes = to.getMinutes();
		toMinutes = toMinutes > 9 ? toMinutes : '0' + toMinutes;
		
		// TODO: Load existing values into fields
		var Datum=from.getDate()+"."+(from.getMonth()+1)+"."+from.getUTCFullYear();
		var fromZeit= (from.getHours())+":"+fromMinutes;
		var toZeit=(to.getHours())+":"+toMinutes;
		

		console.log("edit hier "+Datum);
		console.log("edit hier "+fromZeit);
		console.log("edit hier "+toZeit);
		

		
		//Textfelder mit den letzten Werten befüllen
		$("#edit-datefield").val(Datum);
		$("#edit-fromtime").val(fromZeit);
		$("#edit-totime").val(toZeit);   
		$("#date").val(Datum);
		$("#from").val(fromZeit);
		$("#to").val(toZeit);  
		

		
		
		// Update localStorage (specific ID = time)
         
	});          
}); 


//------------------------------------------------------------------------------
// Defines action after clicking on button "Löschen" ("deleteConTimes") in the popup

$(function() {
	$("#deleteConTimes").click( function() {  
		// get ID of selected time 
		var idNumber = $(".delTime").attr("id");    

		// Remove first letter of string, to get id without the prefix "p"
		var idWithoutPraefix = idNumber.substr(1, idNumber.length);
		
		//get the data from localStorage
        var dates=JSON.parse(localStorage.dates);
		var old;		 
		
		//iterate through the array and copy the remaining dates in a new array
		for (i=0; i<dates.length; i++){	
			var JSONObj = JSON.stringify(dates[i]);

			if(i==idWithoutPraefix){}
			//copy every date that should not be deleted
			else{
				//make sure, that the new array with the remaining dates is not undefined
				//and readable
				if(old!=null){
					old = old.substring(0, old.length-1) + "," + JSONObj + "]";
				}
				else{
					old= "[" + JSONObj + "]";
				}
			}
		}
		 
		//if there are dates left, save them to the localStorage, overwriting the old data
		if((old!= null)&& (old!=undefined)){
			localStorage.dates=old; 
		}
		//if there are no dates left, delete the key from localStorage
		else{
			localStorage.removeItem("dates");		 
		}        
         
        // Remove the item from the time-overview-page 
//		$('li').remove('#'+idWithoutPraefix);
 
		if(localStorage.dates == null) {
			$.infoTimeMessage();
		}
		
		
		// Create new time list with new IDs
	    $( "#time-over-page" ).trigger("pagecreate");

		// Update listview
	//	$('#time-over-list').listview('refresh');
				 
		// Close the popup
		$( "#popup-times" ).popup("close");                 	
    });
}); 

//------------------------------------------------------------------------------

// Is called, while 'time-over-page' is being created




$(document).on("pagecreate","#time-over-page",function(){
//$("#time-over-page").ready(function(){


   // Initialize
   $('#time-over-list').children().remove(); 
   $('#time-content-msg').remove(); 
   
	//if there are already saved values, display them
	if(localStorage.dates != null){
	
		//get dates from localStorage
		var dates=JSON.parse(localStorage.dates);
	
		if(dates != null){
							
			for (var i=0; i<dates.length; i++){
				//display the values
				var from = new Date(dates[i].FromTime);
				var to = new Date (dates[i].ToTime);
				
				//Minuten mit einer "0" auffüllen
				var fromMinutes = from.getMinutes();
				fromMinutes = fromMinutes > 9 ? fromMinutes : '0' + fromMinutes;
				var toMinutes = to.getMinutes();
				toMinutes = toMinutes > 9 ? toMinutes : '0' + toMinutes;
					
				$( "#time-over-list" ).append('<li id="'+ idcounter +'" class="editTime"><a class="read-only-list-time" href="#time-edit-page" id="'+ idcounter +'" > '+from.getDate()+'.'+(from.getMonth()+1)+'.'+ from.getUTCFullYear()+' von '+(from.getHours())+':'+fromMinutes+' bis '+(to.getHours())+':'+toMinutes+'</a><a href="#popup-times" class="deleteTime" data-rel="popup"  data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn ui-corner-all ui-shadow ui-btn-inline" data-icon="delete" data-iconpos="right" >Delete</a></li>');
				idcounter++;
			}

			
		// TODO: Load existing values into fields
		var fromMinutes = from.getMinutes();
		fromMinutes = fromMinutes > 9 ? fromMinutes : '0' + fromMinutes;
		var toMinutes = to.getMinutes();
		toMinutes = toMinutes > 9 ? toMinutes : '0' + toMinutes;

		
		var Datum=from.getDate()+"."+(from.getMonth()+1)+"."+from.getUTCFullYear();
		var fromZeit= (from.getHours())+":"+fromMinutes;
		var toZeit=(to.getHours())+":"+toMinutes;
		
		console.log("edit "+Datum);
		console.log("edit "+fromZeit);
		console.log("edit "+toZeit);
		
		$("#edit-datefield").val(Datum);
		$("#edit-fromtime").val(fromZeit);
		$("#edit-totime").val(toZeit);
		$("#date").val(Datum);
		$("#from").val(fromZeit);
		$("#to").val(toZeit);  		
			
		}	

		$('#time-over-list').listview('refresh');		
	}
	
	else {
		  $.infoTimeMessage();
	}
});
