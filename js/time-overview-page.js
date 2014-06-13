//------------------------------------------------------------------------------
// Function for displaying information message, if no contacts are available 
$.infoTimeMessage = function() { 
	$('#time-content-info').append('<div class="infobox" id="time-content-msg" ><b>Hinweis:</b> <br/> Aktuell hast Du <b>keine Zeiten</b> angelegt. Erstelle Zeiten über den Button "Hinzufügen".</div'); 					
}


//Globale Variable welcher Zeitslot geändert wird
var editNumberId=0;
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
// Is called, while 'time-over-page' is being created
$(document).on("pagecreate","#time-over-page",function(){
	//set idcounter to 0
	var idcounter=0;

   // Initialize
   $('#time-over-list').children().remove(); 
   $('#time-content-msg').remove(); 
   
   // Sorting of localStorage dates
   if(localStorage.dates != null){ 
		sorting();
   }

	//if there are already saved values, display them
	if(localStorage.dates != null){
	
		//get dates from localStorage
		var dates=JSON.parse(localStorage.dates);
	
		if(dates != null){
							
			for (var i=0; i<dates.length; i++){
				//display the values
				var from = new Date(dates[i].FromTime);
				var to = new Date (dates[i].ToTime);
				
				//fill up minutes with zeros
				var fromMinutes = from.getMinutes();
				fromMinutes = fromMinutes > 9 ? fromMinutes : '0' + fromMinutes;
				var toMinutes = to.getMinutes();
				toMinutes = toMinutes > 9 ? toMinutes : '0' + toMinutes;
				
				//create list of saved times to display
				$( "#time-over-list" ).append('<li id="'+ idcounter +'" class="editTime"><a class="read-only-list-time" href="#time-edit-page" id="'+ idcounter +'" > '+from.getDate()+'.'+(from.getMonth()+1)+'.'+ from.getUTCFullYear()+' von '+(from.getHours())+':'+fromMinutes+' bis '+(to.getHours())+':'+toMinutes+'</a><a href="#popup-times" class="deleteTime" data-rel="popup"  data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn ui-corner-all ui-shadow ui-btn-inline" data-icon="delete" data-iconpos="right" >Delete</a></li>');
				idcounter++;
			}
		
			//Load existing values into fields
			var fromMinutes = from.getMinutes();
			fromMinutes = fromMinutes > 9 ? fromMinutes : '0' + fromMinutes;
			var toMinutes = to.getMinutes();
			toMinutes = toMinutes > 9 ? toMinutes : '0' + toMinutes;
			
			var Datum=from.getDate()+"."+(from.getMonth()+1)+"."+from.getUTCFullYear();
			var fromZeit= (from.getHours())+":"+fromMinutes;
			var toZeit=(to.getHours())+":"+toMinutes;
			
			$("#edit-datefield").val(Datum);
			$("#edit-fromtime").val(fromZeit);
			$("#edit-totime").val(toZeit);
			$("#date").val(Datum);
			$("#from").val(fromZeit);
			$("#to").val(toZeit);  		
		}	
		//refresh page view
		$('#time-over-list').listview('refresh');		
	}
	else {
		  $.infoTimeMessage();
	}
	
	    // Highlight current subpage in panel 
	    $(".ui-panel-nav").removeClass('ui-panel-active ui-date-persist');
		$("#time-ov-panel").addClass('ui-panel-active ui-date-persist');
});


//------------------------------------------------------------------------------
// Is called every time a new (sub)page is shown ... Delete times from the past
 $( document ).on( "pagecontainershow", function( event, ui ) {
 	// Get ID of current sub-page
	activePage = $.mobile.activePage.attr('id');
	
	// Is executed, if the subpage is time-overview-page
    if(activePage == 'time-over-page') {
    	// Get current time 
	    var currentDate = new Date().toISOString(); 
	    
	    // Boolean variable ... is set to true, if a date is older than the current date
	    var dateDeleted = false;
	
		
		// Get date from localStorage
    	var dates=JSON.parse(localStorage.dates);
	
		
		var k = 0;
		var newDates;
		
		for (i=0;i<dates.length;i++) {
			var JSONObj= JSON.stringify(dates[i]);
			
			// Check, if date is in the past
			if ( dates[i].ToTime > currentDate  ) {   				 
				if(newDates!=null){
					newDates = newDates.substring(0, newDates.length-1) + "," + JSONObj + "]";
				}
				else{
					newDates= "[" + JSONObj + "]";
				}
		        k++;
		    } else {
		    	dateDeleted = true; 
		    }
		}
				
		// If at least one date is in the past, update the page 
		if(dateDeleted == true ) {
			
			// Set the localStorage dates or remove it, if all dates are deleted 
			if(newDates!=null) {
				localStorage.dates=newDates;	
			} else {
				localStorage.removeItem("dates");	
			}
			
			// Update page
			$( "#time-over-page" ).trigger("pagecreate");
		}
    }
});


//------------------------------------------------------------------------------
// Sorts timeslots so that times will be displayed in chronologic order
function sorting() {
	//get Dates from localStorage
	var dates=JSON.parse(localStorage.dates);
	
	//declare arrays
	zwischen = new Array(dates.length);
	vorher = new Array();
	
	//copy from time into zwischen-Array
	for (i=0;i<zwischen.length;i++) {
		zwischen[i]=dates[i].FromTime;
	}
	
	//sort-function for automated sorting of the FromTimes ONLY
	zwischen.sort();
	
	// Used for comparision, if date is in the past
	var currentDate = new Date().toISOString();
	
	//"Saving" the OLD order of dates.
	//This will be necessary for re-ordering the dates-array in a new one
	for (j=0;j<zwischen.length;j++) {
 		for (i=0; i<dates.length; i++) {	
 			if (dates[i].FromTime==zwischen[j]) {
 				//Saving the OLD index "i" in an array. The index "j" is the NEW index.
				vorher[j]=i;
 			}
 		}
 	}
	
	//new array in wich the objects should be sorted at the end!
	var neu;
	
	//saving sorted "dates" in JSON-Object
	for(i=0;i<vorher.length;i++) {
		var JSONObj= JSON.stringify(dates[vorher[i]]);
		
		//if the new array has already data in it, append new JSON object
		if(neu!=null){
			neu = neu.substring(0, neu.length-1) + "," + JSONObj + "]";
		}
		//if the neu array is empty, create it and initialize it with the first data set
		else{
			neu= "[" + JSONObj + "]";
		}
	}
	//update data in localStorage
	localStorage.dates=neu;
}