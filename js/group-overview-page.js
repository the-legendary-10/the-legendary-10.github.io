// Function results an object (= contact) with firstName, lastName and phoneNumber based on md5 phoneNumber
function searchPhoneNumber(md5number) {
var contactObj;
  $.each( contacts, function( i, contact ) {
  
  		if(md5number == $.md5(contact.phoneNumber)) {
  		
  		 contactObj = {"phoneNumber": contact.phoneNumber,
  		 		       "firstName": contact.firstName,
  		               "lastName": contact.lastName
  		 };
  		    	
  		}
  
  });
  
  return contactObj;
       		
}






//------------------------------------------------------------------------------
// Function defines text that should appear in the popup after clicking on a delete icon

$(function() {

         $("body").on("click", ".deleteField",function(e) {
         
            // get MD5-Hash-Number
            var number= $(this).parent().attr("id");
            
            
            // get contact based on MD5-Hash-NUmber
            var contactObj = searchPhoneNumber(number);
            
            
            //append text to popup
            var text = '<p class="toDelete" id ="' + number +'">Möchtest du den Kontakt <b>' +  contactObj.firstName + ' ' + contactObj.lastName + '</b> <br />aus der Gruppe entfernen?</p>';
            
             $("#popup-content").append(text);
            
            
            
         });    
         
         
}); 

//------------------------------------------------------------------------------
// Removes individual text in the popup after closing the popup
$(function() {

         $( "#popup-action" ).bind({
              popupafterclose: function(event, ui) {
                  
                     
               $(".toDelete").remove();
                     
                }
          });

}); 

//------------------------------------------------------------------------------
// Defines action after clicking on button "Löschen" ("deleteCon") in the popup

$(function() {
      $("#deleteCon").click( function() {
      
      	  // get MD5-Hash-Number of selected contact
          var hashNumber = $(".toDelete").attr("id");    
         
        

           // Get saved group from local storage
           var groupLocalStorage = localStorage.getItem('group');
           
                     
           // Split the local storage value in parts (one part = MD5-Hash-Number)
           var groupLocalStorageArray = groupLocalStorage.split(",");
           
           
           // Identify the item to be deleted
           var itemToBeDeleted;
           for(var i = 0; i< groupLocalStorageArray.length;i++) {
           			if(groupLocalStorageArray[i] == hashNumber) {
           			    itemToBeDeleted = i; 
           			};          	           
           };

          
          
          // Remove the item from the array
          groupLocalStorageArray.splice(itemToBeDeleted,1);
 

		  // Save the new Array in the local storage
          localStorage.setItem('group', groupLocalStorageArray);
            
            
            
          // Remove the item from the group-overview-page  & trigger pagecreate
          var hashNumberString = '#' + hashNumber;
          $('li').remove(hashNumberString);
          
          $( "#group-overview-page" ).trigger("pagecreate");
          
          
          // Uncheck the checkbox in the group-edit-page (id: E (prefix) + hashNumber)
          $("#E" + hashNumber).prop("checked", false).checkboxradio("refresh");
             
            
           
          // Close the popup
           $( "#popup-action" ).popup("close");
                 	
     	}
	);
}); 




//------------------------------------------------------------------------------

// Is called, while 'contact-overview-page' is being created and after changes in the group-edit-page (save-button)
$(document).on("pagecreate","#group-overview-page",function(){
    
    
    // Initialization of group-over-list ... Remove all children
     $( "#group-over-list" ).children().remove();
    
   
    // Creation of user interface (information message if no contact or listview with contacts)
    
   
   	   // If no contact is stored in the local Storage, show an information message
   		if(localStorage.getItem('group')== 0 || localStorage.getItem('group') == undefined ){ 
   		  $('#group-over-list').append('<div class="infobox" ><b>Hinweis:</b> <br/> Aktuell befinden sich <b>keine Kontakte</b> in Deiner Mitagessen-Gruppe. Füge welche über "Gruppe bearbeiten" hinzu.</div'); 
   		  
   		
   		} else{ 					
   				// Get group-value with md5-hash-numbers and convert it to an array	
   				phoneNumbers = localStorage.getItem('group');
   				phoneNumbersArray = phoneNumbers.split(",");
   				
   				
   				// Generate listitem for each md5-hash-number (contact) and append it to the listview
   			    for (var k = 0; k < phoneNumbersArray.length; k++) {
   			    
   				  contactObj = searchPhoneNumber(phoneNumbersArray[k]);
   			
   			      appendString  =	'<li id="' + $.md5(contactObj.phoneNumber) + '"><a class="read-only-list">' + contactObj.firstName + ' ' + contactObj.lastName + '</a><a href="#popup-action" class="deleteField" data-rel="popup"  data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn ui-corner-all ui-shadow ui-btn-inline" data-icon="delete" data-iconpos="right" >Delete</a></li>';
   				
   				   $('#group-over-list').append(appendString);
   				
   				}
   				
   			
   			   // Update listview
               $('#group-over-list').listview('refresh');
   				
   								   			
   		}  
   		       
      
});
