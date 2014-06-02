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
	var Date = JSON.stringify(myDate);
	
	localStorage.Date=Date;
	location.reload(true);
}

$("#time-page").ready(function(){
	
	var date = localStorage.Date.date;
	var fromtime = localStorage.Date.FromTime;
	var totime= localStorage.Date.ToTime;
	
	if(date != null){
		if(fromtime != null){
			if(totime != null){
				var d = new Date(date);
				$( "#LastValues" ).append("<p>Die aktuell gespeicherten Werte sind: am "+d.getDate()+"."+d.getMonth()+"."+d.getUTCFullYear()+" von: "+fromtime+" bis "+totime+"</p>");
				$( "#ButtonSaveTime").html("Ändern");
			}
		}
	}	
});