$( document ).on( "pageinit", "#main-page", function() {
    $( document ).on( "swiperight", "#main-page", function( e ) {
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight"  ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
});
