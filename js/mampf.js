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
	date= $("#mydate").val();
	from = $("#fromtime").val();
	to = $("#totime").val();
	
	localStorage.Date=date;
	localStorage.FromTime=from;
	localStorage.ToTime=to;
	location.reload(true);
}