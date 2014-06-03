$(function(){
	$("#popup-times").click( function(){
	//	alert("popup-times");
	});

});

$(function() {
    $("#deleteConTimes").click( function() {
	//	alert("deletecontimes");
		
		var savedTimes=localStorage.dates;
		console.log(savedTimes);
		
		//get element that should be deleted
		var idToDelete = $(".deleteTime").attr("id"); 
		console.log(idToDelete);
		
		//search element in list
		
		//delete element from list
		
		//write changes to localStorage
		
		//remove item from list view
		
		//reload view
	});
});
