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
	var MyTime = new Object();
	MyTime.date= $("#mydate").val();
	MyTime.from = $("#fromtime").val();
	MyTime.to = $("#totime").val();
	
	localStorage.myTimes=MyTime;
}