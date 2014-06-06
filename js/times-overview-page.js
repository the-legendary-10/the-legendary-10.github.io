
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
// Defines action after clicking on button "Löschen" ("deleteConTimes") in the popup

$(function() {
      $("#deleteConTimes").click( function() {
      
      	  // get MD5-Hash-Number of selected contact
          var idNumber = $(".delTime").attr("id");    
          
          
          // Remove first letter of string, to get id without the prefix "p"
           var idWithoutPraefix = idNumber.substr(1, idNumber.length);
         
         
         // Start ToDo ... Remove the time from the localStorage-Array
         
         
         
         
         // End ToDo ... Remove the time from the localStorage-Array
         
         
          // Remove the item from the time-overview-page 
		  $('li').remove('#'+idWithoutPraefix);
		  
		  
		  if(localStorage.dates == null) {
		  
		 	 $.infoTimeMessage();
		 	 
		 }
		//  $( "#time-over-page" ).trigger("pagecreate");
		  
		  
		  // Update listview
          $('#time-over-list').listview('refresh');
		             
          // Close the popup
           $( "#popup-times" ).popup("close");
                 	
     	}
	);
}); 
