$(function() {
			$( "body>[data-role='panel']" ).panel();
		});

$(function () {
  $("[data-role=panel]").panel().enhanceWithin();
});

var dates = new Array();
function SaveMyTime(){	

	//Create a new JSON Object containing the date and time values 
	var myDate = new Object();
	myDate.Date = $("#mydate").val();;
	myDate.FromTime = $("#fromtime").val();
	myDate.ToTime = $("#totime").val();
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
			$( "#ButtonSaveTime").html("Ändern");
		}
	}	
});