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
 
		if(localStorage.dates == null) {
			$.infoTimeMessage();
		}
			
		// Create new time list with new IDs
	    $( "#time-over-page" ).trigger("pagecreate");
				 
		// Close the popup
		$( "#popup-times" ).popup("close");                 	
    });
});
