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

$(function(){

	$("#pitch .player").click(function(){

		var position = $(this).data("position");
		var player_id = teamPlayers[position].id;
		window.location = "/players/"+ player_id;
	});

});