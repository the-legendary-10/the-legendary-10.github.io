
//------------------------------------------------------------------------------
// Function defines text that should appear in the popup after clicking on a delete icon

$(function() {

         $("body").on("click", ".deleteTime",function(e) {
        	
            // get id of list item
            var idListItem = $(this).parent().attr("id");

            
            //append text to popup
            // id = P (Praefix) + h5-hashNumber
            var text = '<p class="delTime" >Möchtest du die Zeit <b>' + $(this).parent().text() + ' </b>entfernen?</p>';
            
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