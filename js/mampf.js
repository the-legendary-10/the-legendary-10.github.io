$(function() {
			$( "body>[data-role='panel']" ).panel();
		});

$(function () {
  $("[data-role=panel]").panel().enhanceWithin();
});

function SaveMyTime(){	
	var myDate = new Object();
	myDate.Date = $("#mydate").val();;
	myDate.FromTime = $("#fromtime").val();
	myDate.ToTime = $("#totime").val();
	var date = JSON.stringify(myDate);
	
	localStorage.date=date;
	location.reload(true);
}

$("#time-page").ready(function(){
	var date=localStorage.Date;

	if(date != null){
		var myDate=JSON.parse(date);
		var d = new Date(myDate.Date);
		$( "#LastValues" ).append("<p>Die aktuell gespeicherten Werte sind: am "+d.getDate()+"."+d.getMonth()+"."+d.getUTCFullYear()+" von: "+myDate.FromTime+" bis "+myDate.ToTime+"</p>");
		$( "#ButtonSaveTime").html("Ändern");
	}	
	
});