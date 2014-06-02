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
	var unconvDate = $("#datefield").val();
	var Datum = unconvDate.split(".");
	myDate.Date = new Date(Datum[2]+"-"+Datum[1]+"-"+Datum[0]);
	var convDate = Datum[2]+"-"+Datum[1]-1+"-"+Datum[0];
		
	//convert times
	var unconvFrom = $("#fromtime").val();
	var unconvFromPart = unconvFrom.split(":");
	var NewFromTime = new Date(Datum[2], Datum[1]-1, Datum[0], unconvFromPart[0], unconvFromPart[1], "00");
	myDate.FromTime = NewFromTime;
	
	var unconvTo = $("#totime").val();
	var unconvToPart = unconvTo.split(":");
	var NewToTime = new Date(Datum[2], Datum[1]-1, Datum[0], unconvToPart[0], unconvToPart[1], "00");	
	myDate.ToTime = NewToTime;
	
	//Check if Times and Dates make sense and are empty
	if ((myDate.Date!= null) && (myDate.FromTime!= null) && (myDate.ToTime!= null)){
		
		//get todays date
		var today = new Date();
			
		//check if data makes sense
		if((myDate.Date >= today) && (myDate.FromTime < myDate.ToTime) ){
		
			//Create a new JSON Object containing the date and time values 
			var JSONdate = JSON.stringify(myDate);
			
			//TODO umwandeln in Array mit push, nicht mit Übergangslösung über # getrennt
			
			/*
			if there are already saved values, read them and append the new value, otherwise 
			just set old to the current JSON object
			*/
			var old = localStorage.getItem("dates");
			if(old!=null){
				old = old+"#"+JSONdate;
			}
			else{
				old= JSONdate;
			}
			
			//save the values to localStorage and reload the page
			localStorage.dates=old;
			location.reload(true);
		
		}
		else{
			alert("Bitte sinnvolle Werte eingeben");
		}
	}
	else{
		alert("Bitte die fehlenden Werte Werte ausfüllte!");
	}
}

$("#time-page").ready(function(){
	//get dates from localStorage
	var dates=localStorage.dates;

	//if there are already saved values, display them
	if(dates != null){
		var myDates = dates.split('#');
		$( "#LastValues" ).append("Die aktuell gespeicherten Werte sind:<br>");
		
		for (var i=0; i<myDates.length; i++){
			//get individual data sets and parse them to get a JSON object
			var obj = eval('('+myDates[i]+')');
			var myDate = JSON.parse(JSON.stringify(obj));
			
			//display the values
			var d = new Date(myDate.Date);
			$( "#LastValues" ).append("am "+d.getDate()+"."+d.getMonth()+"."+d.getUTCFullYear()+" von: "+myDate.FromTime+" bis "+myDate.ToTime+"</p>");
			//$( "#ButtonSaveTime").html("Ändern");
		}
	}	
	
	
	//Load the actual values into the date- and time-fields ("YIIIIEEEHHAAAAA!")
	var x = JSON.parse(JSON.stringify(obj));
	var y = new Date(x.Date);
	
	$("#datefield").val(y.getDate()+"."+y.getMonth()+"."+y.getUTCFullYear());
	$("#fromtime").val(x.FromTime);
	$("#totime").val(x.ToTime);
	
});