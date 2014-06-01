$( document ).on( "pageinit", "#main-page", function() {
    $( document ).on( "swiperight", "#main-page", function( e ) {
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight"  ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
});

function SaveMyTime(){	
	localStorage.Date = $("#mydate").val();;
	localStorage.FromTime = $("#fromtime").val();
	localStorage.ToTime = $("#totime").val();
	location.reload(true);
}

$("#time-page").ready(function(){
	var date = localStorage.Date;
	var fromtime = localStorage.FromTime;
	var totime= localStorage.ToTime;
	
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