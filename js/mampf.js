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

