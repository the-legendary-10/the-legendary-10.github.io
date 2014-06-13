//------------------------------------------------------------------------------
// Function for saving new times 
function SaveMyTime(){	
	//declare used variables
	var idcounter=0;
	var myDate = new Object();
	
	//convert Date in usable format
	//Date is reduced by 1 to enable comparability with today (JS starts counting with 0)
	var unconvDate = $("#datefield").val();

	//check if date is undefined or empty
	if((unconvDate != undefined) && (unconvDate !="")&& (unconvDate !=null)){
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
			//convert times and save them to myDate
			var unconvFrom = $("#fromtime").val();
			var unconvFromPart = unconvFrom.split(":");
			var NewFromTime = new Date(Datum[2], Datum[1]-1, Datum[0], (parseInt(unconvFromPart[0])), unconvFromPart[1], "00");
			myDate.FromTime = NewFromTime;
			
			var unconvTo = $("#totime").val();
			var unconvToPart = unconvTo.split(":");
			var NewToTime = new Date(Datum[2], Datum[1]-1, Datum[0], (parseInt(unconvToPart[0])), unconvToPart[1], "00");	
			myDate.ToTime = NewToTime;
			
			//Check if Times and Dates are empty or undefined
			if ((myDate.FromTime== null) || (myDate.ToTime== null) || (myDate.FromTime == undefined)  || (myDate.ToTime == undefined)){
				alert("Bitte Werte eintragen!");
				event.preventDefault();
			}
			else{
				//check if times are valid
				var Regex = /Invalid Date/;
				if (Regex.exec(myDate.FromTime) || (Regex.exec(myDate.ToTime))){
					alert("Bitte einen Zeitrahmen angeben");
					event.preventDefault();
				}
				else{
					//Check if end time is before start time
					if(myDate.FromTime > myDate.ToTime){
						alert("Bitte die Zeiten anpassen");
						event.preventDefault();
					}
					else{
						//check if duration is >=45 minutes
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
								var dates=JSON.parse(localStorage.dates);
								
								//set idcounter to dates.length
								idcounter=dates.length;
							}
							else{
								old= "[" + JSONdate + "]";
							}
							
							//save the values to localStorage
							localStorage.dates=old;
							
							//fill up minutes with zeros
							var fromMinutes = myDate.FromTime.getMinutes();
							fromMinutes = fromMinutes > 9 ? fromMinutes : '0' + fromMinutes;
							var toMinutes = myDate.ToTime.getMinutes();
							toMinutes = toMinutes > 9 ? toMinutes : '0' + toMinutes;
							
							//create output
							$( "#time-over-list" ).append('<li id="'+ idcounter +'" class="editTime"><a class="read-only-list-time" href="#time-edit-page" > '+myDate.FromTime.getDate()+'.'+(myDate.FromTime.getMonth()+1)+'.'+myDate.FromTime.getUTCFullYear()+' von '+(myDate.FromTime.getHours())+':'+fromMinutes+' bis '+(myDate.ToTime.getHours())+':'+toMinutes+'</a><a href="#popup-times" class="deleteTime" data-rel="popup"  data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn ui-corner-all ui-shadow ui-btn-inline" data-icon="delete" data-iconpos="right" id="'+ idcounter +'">Delete</a></li>');
							idcounter++;
							
							// Remove information message, if visible
							$('#time-content-msg').remove(); 
							
							//reload page to update changes
							$( "#time-over-page" ).trigger("pagecreate");			
						}
					}
				}
			}
		}
	}
	else{
		alert("Datum ist nicht definiert!");
		event.preventDefault();
	}
}