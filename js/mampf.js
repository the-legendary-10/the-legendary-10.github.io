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