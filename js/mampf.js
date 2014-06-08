$(function() {
	$( "body>[data-role='panel']" ).panel();
});

$(function () {
  $("[data-role=panel]").panel().enhanceWithin();
});

$(function() {
	$("#left-panel").on("click", "a",function(e) {
		$(".ui-panel-nav").removeClass('ui-panel-active ui-date-persist');
		$(this).addClass('ui-panel-active ui-date-persist');
	});
});