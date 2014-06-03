$(function(){
	$("#popup-times").click( function(){
	//	alert("popup-times");
	});

});

$(function() {
    $("#deleteConTimes").click( function() {
	//	alert("deletecontimes");
		
		var dates=JSON.parse(localStorage.dates);
		console.log(dates);
		
		//get element that should be deleted
		var idToDelete = $(".deleteTime").attr("id");; 
		console.log(idToDelete);
		
		//search element in list
		for (var i=0; i<dates.length; i++){
			
		}
		//delete element from list
		
		//write changes to localStorage
		
		//remove item from list view
		
		//reload view
	});
});
