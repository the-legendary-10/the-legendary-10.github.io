
//------------------------------------------------------------------------------
// Function defines text that should appear in the popup after clicking on a delete icon

$(function() {

         $("body").on("click", ".deleteTime",function(e) {
        	
            // get id of list item
            var idListItem = $(this).parent().attr("id");

            
            //append text to popup
            // id = P (Praefix) + idListItem, since an ID should be unique in an HTML-Document and idListItem is already used 
            var text = '<p class="delTime" + id="P' + idListItem + '">Möchtest du die Zeit <b>' + $(this).parent().text() + ' </b>entfernen?</p>';
            
             $("#popup-content-times").append(text);
            
            
            


         });    

 
}); 


//------------------------------------------------------------------------------
// Removes individual text in the popup after closing the popup
$(function() {

         $( "#popup-times" ).bind({
              popupafterclose: function(event, ui) {
                  
                     
               $(".delTime").remove();
                     
                }
          });

}); 



//------------------------------------------------------------------------------
// Function for displaying information message, if no contacts are available 


$.infoTimeMessage = function() { 
			$('#time-content-info').append('<div class="infobox" id="time-content-msg" ><b>Hinweis:</b> <br/> Aktuell hast Du <b>keine Zeiten</b> angelegt. Erstelle Zeiten über den Button "Hinzufügen".</div'); 			
			
 }




//------------------------------------------------------------------------------
// Function defines action after clicking on an existing time (class = editTime)

$(function() {

         $("body").on("click", ".editTime",function(e) {
			    // get ID of selected time 
                var idNumber = $(".delTime").attr("id");  
				console.log(idNumber);
                
                // Remove first letter of string, to get id without the prefix "p"
                var idWithoutPraefix = idNumber.substr(1, idNumber.length);
         		

				if((localStorage.dates!=null) && (localStorage.dates!= undefined)){
					var dates=JSON.parse(localStorage.dates);
					
					var from = new Date(dates[idWithoutPraefix].FromTime);
					var to = new Date (dates[idWithoutPraefix].ToTime);
					
					console.log(from);
					console.log(to);
				}
				// TODO: Load existing values into fields
				
				// $('#edit-date').val('dd-MM-yyyy');   
				// $('#edit-from').val(' ');               
				// $('#edit-to').val(' ');      
				
				
				
				// Update localStorage (specific ID = time)
            
            
            
         });    
           
}); 


//------------------------------------------------------------------------------
// Defines action after clicking on button "Löschen" ("deleteConTimes") in the popup

$(function() {
	$("#deleteConTimes").click( function() {  
		// get ID of selected time 
		var idNumber = $(".delTime").attr("id");    

		// Remove first letter of string, to get id without the prefix "p"
		var idWithoutPraefix = idNumber.substr(1, idNumber.length);
		
		//get the data from localStorage
        var dates=JSON.parse(localStorage.dates);
		var old;		 
		
		//iterate through the array and copy the remaining dates in a new array
		for (i=0; i<dates.length; i++){	
			var JSONObj = JSON.stringify(dates[i]);

			if(i==idWithoutPraefix){}
			//copy every date that should not be deleted
			else{
				//make sure, that the new array with the remaining dates is not undefined
				//and readable
				if(old!=null){
					old = old.substring(0, old.length-1) + "," + JSONObj + "]";
				}
				else{
					old= "[" + JSONObj + "]";
				}
			}
		}
		 
		//if there are dates left, save them to the localStorage, overwriting the old data
		if((old!= null)&& (old!=undefined)){
			localStorage.dates=old; 
		}
		//if there are no dates left, delete the key from localStorage
		else{
			localStorage.removeItem("dates");		 
		}        
         
        // Remove the item from the time-overview-page 
//		$('li').remove('#'+idWithoutPraefix);
 
		if(localStorage.dates == null) {
			$.infoTimeMessage();
		}
		
		
		// Create new time list with new IDs
	    $( "#time-over-page" ).trigger("pagecreate");

		// Update listview
	//	$('#time-over-list').listview('refresh');
				 
		// Close the popup
		$( "#popup-times" ).popup("close");                 	
    });
}); 

//------------------------------------------------------------------------------

// Is called, while 'time-over-page' is being created




$(document).on("pagecreate","#time-over-page",function(){
//$("#time-over-page").ready(function(){

	var idcounter=0;

   // Initialize
   $('#time-over-list').children().remove(); 
   $('#time-content-msg').remove(); 
   
	//if there are already saved values, display them
	if(localStorage.dates != null){
	
		//get dates from localStorage
		var dates=JSON.parse(localStorage.dates);
	
		if(dates != null){
							
			for (var i=0; i<dates.length; i++){
				//display the values
				var from = new Date(dates[i].FromTime);
				var to = new Date (dates[i].ToTime);
				
				//Minuten mit einer "0" auffüllen
				var fromMinutes = from.getMinutes();
				fromMinutes = fromMinutes > 9 ? fromMinutes : '0' + fromMinutes;
				var toMinutes = to.getMinutes();
				toMinutes = toMinutes > 9 ? toMinutes : '0' + toMinutes;
				
				
				$( "#time-over-list" ).append('<li id="'+ idcounter +'" class="editTime"><a class="read-only-list-time" href="#time-edit-page" id="'+ idcounter +'" > '+from.getDate()+'.'+(from.getMonth()+1)+'.'+ from.getUTCFullYear()+' von '+(from.getHours())+':'+fromMinutes+' bis '+(to.getHours())+':'+toMinutes+'</a><a href="#popup-times" class="deleteTime" data-rel="popup"  data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn ui-corner-all ui-shadow ui-btn-inline" data-icon="delete" data-iconpos="right" >Delete</a></li>');
				idcounter++;
			}
			//Textfelder mit den letzten Werten befüllen
			$("#datefield").val(from.getDate()+"."+(from.getMonth()+1)+"."+from.getUTCFullYear());
			$("#fromtime").val((from.getHours())+":"+from.getMinutes());
			$("#totime").val((to.getHours())+":"+to.getMinutes());
		}	

		$('#time-over-list').listview('refresh');
		
	}
	
	else {
		  $.infoTimeMessage();
	}
	
});
