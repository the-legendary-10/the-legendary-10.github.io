$( document ).on( "pageinit", "#main-page", function() {
    $( document ).on( "swiperight", "#main-page", function( e ) {
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight"  ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
});

$( document ).on( "pageinit", "#group-overview-page", function() {
    $( document ).on( "swiperight", "#group-overview-page", function( e ) {
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight"  ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
});

$( document ).on( "pageinit", "#group-edit-page", function() {
    $( document ).on( "swiperight", "#group-edit-page", function( e ) {
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight"  ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
});

$( document ).on( "pageinit", "#time-page", function() {
    $( document ).on( "swiperight", "#time-page", function( e ) {
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight"  ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
});

/*$(document).on("pagecreate", function () {
    $("[data-role=panel]").one("panelbeforeopen", function () {
        var height = $.mobile.pageContainer.pagecontainer("getActivePage").outerHeight();
        $(".ui-panel-wrapper").css("height", height + 1);
    });
});*/

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