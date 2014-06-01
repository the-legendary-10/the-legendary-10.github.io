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

function LoadMyTime(){
	var date = localStorage.Date;
	var fromtime = localStorage.FromTime;
	var totime= localStorage.ToTime;
}