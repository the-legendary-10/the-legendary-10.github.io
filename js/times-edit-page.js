var dates = new Array();

$(function() {
	$("#ButtonChangeTime").click( function(event) {
	var myDate = new Object();
	var id = editNumberId; 
	console.log("Editid: "+id);
	
	//Read Values from input fields
	
	//convert Date in usable format
	//Datum wird um 1 reduziert, um eine Vergleichbarkeit mit today zu ermöglichen (JS fängt bei 0 an!)
	var unconvDate = $("#edit-datefield").val();
//	console.log("unconvDate :"+unconvDate);

	if((unconvDate != undefined) && (unconvDate !="")){
		var Datum = unconvDate.split(".");
		var WhishedDate = new Date(Datum[2],Datum[1]-1,Datum[0],23,59,59);
//		console.log("WhishedDate: "+WhishedDate);
			
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
	//		console.log("FromTime"+myDate.FromTime);
			
			var unconvTo = $("#edit-totime").val();
			var unconvToPart = unconvTo.split(":");
			var NewToTime = new Date(Datum[2], Datum[1]-1, Datum[0], (parseInt(unconvToPart[0])), unconvToPart[1], "00");	
			myDate.ToTime = NewToTime;
	//		console.log("myDate.ToTime"+myDate.ToTime);
			
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
						//var JSONdate = JSON.stringify(myDate);
						//console.log("JSONdate = "+JSONdate);
						/*
						if there are already saved values, read them and append the new value, otherwise 
						just set old to the current JSON object
						*/
		
						//get the data from localStorage
						var dates=JSON.parse(localStorage.dates);
						var old;	
						var JSONObj;
						
						//iterate through the array and copy the remaining dates in a new array
						for (i=0; i<dates.length; i++){	
							
						//	console.log("i: "+i);
							if(i==id){
							//	console.log("i==id");
								JSONObj = JSON.stringify(myDate);
							//	console.log("JSONObj: "+JSONObj);
							}
							else{
								//copy every date that should not be modified
								JSONObj = JSON.stringify(dates[i]);
							//	console.log("JSONObj: "+JSONObj);
							}
								//make sure, that the new array with the remaining dates is not undefined
								//and readable
							//	console.log(i+" "+JSONObj);
								if(old!=null){
									old = old.substring(0, old.length-1) + "," + JSONObj + "]";
								}
								else{
									old= "[" + JSONObj + "]";
								}
							
						}//for
						 console.log("old"+old);
						//if there are dates left, save them to the localStorage, overwriting the old data
						if((old!= null)&& (old!=undefined)){
							console.log("Ins LocalStorage gespeichert");
							localStorage.dates=old; 
							console.log(localStorage.dates);
						}
						//if there are no dates left, delete the key from localStorage
						else{
							console.log("dates from localStorage removed");
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
	}
	});
});
