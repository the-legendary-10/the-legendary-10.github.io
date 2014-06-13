/*Append and show the panel on Page-Initiation*/
$(function() {
	$( "body>[data-role='panel']" ).panel();
});

/*Enhance all the children of all elements in the set of matched elements.*/
$(function () {
  $("[data-role=panel]").panel().enhanceWithin();
});

/*on click on page in panel -> removeClass "date persist" -> Mark active Page on Panel as red */
$(function() {
	$("#left-panel").on("click", "a",function(e) {
		$(".ui-panel-nav").removeClass('ui-panel-active ui-date-persist');
		$(this).addClass('ui-panel-active ui-date-persist');
	});
});

$(document).on("pagecreate","#main-page",function(){
    
	// Save phone number
	$("#telephoneButton").on("click",savePhoneNumber);
			
	// Set background for collapsible box 
	$("#telephone-title a").addClass("field-telephone-main-page");
	
	// Display phone number
	var ownPhone = localStorage.getItem("ownphone");
	if(ownPhone != undefined ){
		$("#telephone").val(ownPhone);
		$("#telephone").removeClass("field-telephone-main-page");

		$("#telephoneButton").text("\u00c4ndern");
//		$("#telephoneButton").addClass("button-save-main-page");
		$("#telephone-title a").text("Eigene Nummer bearbeiten");
		$("#telephone-coll").collapsible( "option", "collapsed", true );
		$("#telephone-title a").removeClass("field-telephone-main-page");

	}
	
});

/*Independent: save own phone number*/
function savePhoneNumber(){
	var phoneNumber = $('#telephone').val();
	
	for(i = 0; i<phoneNumber.length;i++) {
        if(phoneNumber.charAt(i) < "0" || phoneNumber.charAt(i) > "9" ) {
            alert("Bitte Ziffern eingeben.");
            event.preventDefault();
            return;
		}
    }


	if(phoneNumber.length <= 7 || phoneNumber.length > 20 ) {
        alert("Bitte mindestens 7 und höchstens 20 Ziffern eingeben.");
        event.preventDefault();
    }


    else {
        localStorage.setItem("ownphone", phoneNumber);
        $("#telephone").removeClass("field-telephone-main-page");
        $("#telephoneButton").text("\u00c4ndern");
        $("#telephone-title a").text("Eigene Nummer bearbeiten");
        $("#telephone-coll").collapsible( "option", "collapsed", true );
        $("#telephone-title a").removeClass("field-telephone-main-page");
    }

}

//on changed device orientation
$( window ).on( "orientationchange", function( event ) {
	resizeMap();
});