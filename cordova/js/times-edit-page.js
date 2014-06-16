//------------------------------------------------------------------------------
// Function defines action after clicking on an existing time (class = editTime)

$(function() {
	$("body").on("click", ".editTime",function(e) {

		//get id of the element to be modified
		var idNumber = $(this).attr("id");
		editNumberId = idNumber;
	    
		//get dates from localStorage
		var dates=JSON.parse(localStorage.dates);

		//extract times from dates
		var from = new Date(dates[idNumber].FromTime);
		var to = new Date (dates[idNumber].ToTime);
			
		//fill up minutes with zeros
		var fromMinutes = from.getMinutes();
		fromMinutes = fromMinutes > 9 ? fromMinutes : '0' + fromMinutes;
		var toMinutes = to.getMinutes();
		toMinutes = toMinutes > 9 ? toMinutes : '0' + toMinutes;
		
		//Load existing values into fields
		var Datum=from.getDate()+"."+(from.getMonth()+1)+"."+from.getUTCFullYear();
		var fromZeit= (from.getHours())+":"+fromMinutes;
		var toZeit=(to.getHours())+":"+toMinutes;
		
		$("#edit-datefield").val(Datum);
		$("#edit-fromtime").val(fromZeit);
		$("#edit-totime").val(toZeit);   
		$("#date").val(Datum);
		$("#from").val(fromZeit);
		$("#to").val(toZeit);  
	});          
}); 


//------------------------------------------------------------------------------
//Function to save changes at a timeslot
var dates = new Array();

$(function() {
	$("#ButtonChangeTime").click( function(event) {
	var myDate = new Object();
	var id = editNumberId; 
	
	//Read Values from input fields
	
	//convert Date in usable format
	//reduce date, to compare the date with today
	var unconvDate = $("#edit-datefield").val();

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
			var unconvFrom = $("#edit-fromtime").val();
			var unconvFromPart = unconvFrom.split(":");
			var NewFromTime = new Date(Datum[2], Datum[1]-1, Datum[0], (parseInt(unconvFromPart[0])), unconvFromPart[1], "00");
			myDate.FromTime = NewFromTime;
			
			var unconvTo = $("#edit-totime").val();
			var unconvToPart = unconvTo.split(":");
			var NewToTime = new Date(Datum[2], Datum[1]-1, Datum[0], (parseInt(unconvToPart[0])), unconvToPart[1], "00");	
			myDate.ToTime = NewToTime;
			
			//Check if Times and Dates make sense and are empty
			if ((myDate.FromTime== null) || (myDate.ToTime== null) || (myDate.FromTime == undefined)  || (myDate.ToTime == undefined)){
				alert("Bitte Werte eintragen!");
				event.preventDefault();
				
			}else{
				//Check if the endtime is befor starttime
				if(myDate.FromTime > myDate.ToTime){
					alert("Bitte die Startzeit vor die Endzeit anlegen!");
					event.preventDefault();
					
				}else{
					if((((myDate.ToTime-myDate.FromTime)/1000)/60)<45){
						alert("Bitte nimm dir mindestens 45 min Zeit zum Essen!");
						event.preventDefault();
					}
					else{
						//Create a new JSON Object containing the date and time values 
		
						//get the data from localStorage
						var dates=JSON.parse(localStorage.dates);
						var old;	
						var JSONObj;
						
						//iterate through the array and copy the remaining dates in a new array
						for (i=0; i<dates.length; i++){	
							
							if(i==id){
								//replace old content with the new changed times
								JSONObj = JSON.stringify(myDate);
							}
							else{
								//copy every date that should not be modified
								JSONObj = JSON.stringify(dates[i]);
							}
								//make sure, that the new array with the remaining dates is not undefined
								//and readable
								if(old!=null){
									old = old.substring(0, old.length-1) + "," + JSONObj + "]";
								}
								else{
									old= "[" + JSONObj + "]";
								}
							
						}//for
						
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
					}
				}
			}
		}
	}else{
		alert("Datum ist nicht definiert!");
		event.preventDefault();
	}
	});
});
