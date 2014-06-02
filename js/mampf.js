$(function() {
			$( "body>[data-role='panel']" ).panel();
		});

$(function () {
  $("[data-role=panel]").panel().enhanceWithin();
});

var dates = new Array();
function SaveMyTime(){	

	//TODO Sanatize INPUT / Check INPUT
	
	var myDate = new Object();
	myDate.Date = $("#mydate").val();;
	myDate.FromTime = $("#fromtime").val();
	myDate.ToTime = $("#totime").val();
	var JSONdate = JSON.stringify(myDate);
	
	//TODO umwandeln in Array mit push, nicht mit Übergangslösung über # getrennts
	var old = localStorage.getItem("dates");
	if(old!=null){
		old = old+"#"+JSONdate;
	}
	else{
		old= JSONdate;
	}
	localStorage.dates=old;
	location.reload(true);
}

$("#time-page").ready(function(){
	var dates=localStorage.dates;

	if(dates != null){
		var myDates = dates.split('#');
		$( "#LastValues" ).append("Die aktuell gespeicherten Werte sind:<br>");
		
		for (var i=0; i<myDates.length; i++){
			var obj = eval('('+myDates[i]+')');
			var myDate = JSON.parse(JSON.stringify(obj));
			
			var d = new Date(myDate.Date);
			$( "#LastValues" ).append("am "+d.getDate()+"."+d.getMonth()+"."+d.getUTCFullYear()+" von: "+myDate.FromTime+" bis "+myDate.ToTime+"</p>");
			$( "#ButtonSaveTime").html("Ändern");
		}
	}	
});