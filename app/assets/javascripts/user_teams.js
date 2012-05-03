$(function() {
  	$( "#slider" ).slider({
			range: true,
			min: 0,
			max: 11,
			values: [ 0, 11 ],
			slide: function( event, ui ) {
				$('#low_boundary').val($( "#slider" ).slider( "values", 0 ));
				$('#high_boundary').val($( "#slider" ).slider( "values", 1 ));
			}
		});
});