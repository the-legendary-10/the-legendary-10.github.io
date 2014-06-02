
// Function for sorting Contacts by first letter of first name
function compareLettersContacts(a,b) {
  if (a.firstName > b.firstName)
     return 1;
  if (a.firstName < b.firstName)
    return -1;
  return 0;
}


//------------------------------------------------------------------------------

// Function checks whether md5-cash value is already in the local storage.
// It is used for the creation of the group-edit-page. Based on the result of this function, all checkboxes of items, which are already in the storage, will be checked. 
function IsContactInStorage(md5number) {

		if(localStorage.getItem('group')== 0 || localStorage.getItem('group') == undefined ){ 
		
				return false;
				
		} else {
		
				phoneNumbers = localStorage.getItem('group');
				phoneNumbersArray = phoneNumbers.split(",");
						
				for (var k = 0; k < phoneNumbersArray.length; k++) {
					if(phoneNumbersArray[k] == md5number) {
						return true;
					}
				}
				
				return false;
		
		}
	
}



//------------------------------------------------------------------------------

// Function for creating a dynamic listview, displaying all contacts in the adressbook
function dynamicListView(contacts) {

        	    // A list item is created for each contact of the adressbook
        	    	$.each( contacts, function( i, contact ) {
     
        	        // Phone number is converted to md5-hash value
        	    	hashNumber = $.md5(contact.phoneNumber);
        	    	

        	                	        
        	        // Is contact already in the storage? If yes, checkbox will be checked        	       
        	           var checkedString = "";
        	        
        	           if(IsContactInStorage(hashNumber)) {
        	           		checkedString = "checked";
        	           
        	           }
        	           
        	           //  Appending new list view element to the listview
        	           // id and name gets the letter 'E' (for Edit-page) as prefix, since HTML4 does not support IDs starting with a digit.
        	           $('#groupList').append('<li style=" padding: 0em;  "><label class="listview" ><a  href="#" class="listview" ><div class="listview" >' + contact.firstName + ' ' + contact.lastName + '</div><input data-iconpos="left"  class="allCheckboxesContacts" name="E' + hashNumber + '" id="E' + hashNumber + '" type="checkbox" value="true" ' + checkedString + ' /></a></label></li>');
        	        
     
        	       });  
        	               	        	       
        	       // Updating listview
        	        $('#groupList').listview('refresh');
        	        $("[type=checkbox]").checkboxradio();
        	        $("[data-role=controlgroup]").controlgroup("refresh");
        	   

}


//------------------------------------------------------------------------------
// // Probably we do not need it. 
// Enables the save-button, if at least one checkbox is checked 
//$(document).on("change", ".allCheckboxesContacts", function () {
//  var checkkboxesChecked = $('.allCheckboxesContacts:checked')
//    if (checkkboxesChecked.length > 0) {
//        $("#saveContacts").removeClass('ui-disabled');
//
//    } else {
//        $("#saveContacts").addClass('ui-disabled');
//       
//    }
//});


//------------------------------------------------------------------------------
// Functionality for save button. MD5-hash values of all selected contacts (phone numbers) will be saved in the localStorage (key in storage: "group")
$(function() {
      $("#saveContacts").click( function() {
           
           
           arrayPhoneNumbers = new Array();
           
           
         // Get all unchecked line items with their ID without prefix ( = only md5-hash-phoneNumber)... It will be stored in the Array arrayPhoneNumbers
         $('input[type="checkbox"]').filter('.allCheckboxesContacts').each(function(){
           	   if($(this).is(':checked')){
           	   
           		   idValue =   this.getAttribute('id');
           		   numberH5 = idValue.substr(1, idValue.length)
           		   arrayPhoneNumbers.push(numberH5);
           	             	    
           	   }
           	
           	});
           	
           	
           	// Store MD5-hash phonenumbers of selected contacts in the local storage
           localStorage.setItem("group", arrayPhoneNumbers);
           
           
           // Trigger update of group-overview-page
            $( "#group-overview-page" ).trigger("pagecreate");
           	 
           	 
           }
      );
});   
//------------------------------------------------------------------------------

// Is called, while 'contact-page' is being created 
$(document).on("pagecreate","#group-edit-page",function(){
		      
		 
		    // Sorting of contacts (specified in contact-data.js) by first letter of first name
		    contacts.sort(compareLettersContacts);
		    

		    // Creation of dynamic listview
		    dynamicListView(contacts);
		    
		     		
});
