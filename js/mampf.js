$(function() {
			$( "body>[data-role='panel']" ).panel();
		});

$(function () {
  $("[data-role=panel]").panel().enhanceWithin();
});

var dates = new Array();
function SaveMyTime(){	
	var myDate = new Object();
	myDate.Date = $("#mydate").val();;
	myDate.FromTime = $("#fromtime").val();
	myDate.ToTime = $("#totime").val();
	var JSONdate = JSON.stringify(myDate);
	
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
		console.log(dates);
		var myDates = dates.split('#');
		console.log(myDates);
		console.log(myDates[0]);
		
		for (var date in myDates){
			console.log(date);
		}
		/*
		var myDate=JSON.parse(date[0]);
		var d = new Date(myDate.Date);
		$( "#LastValues" ).append("<p>Die aktuell gespeicherten Werte sind: am "+d.getDate()+"."+d.getMonth()+"."+d.getUTCFullYear()+" von: "+myDate.FromTime+" bis "+myDate.ToTime+"</p>");
		$( "#ButtonSaveTime").html("Ändern");
		*/
	}
	else{
		//alert("null");
	}
	
});