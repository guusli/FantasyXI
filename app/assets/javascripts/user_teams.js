$(function() {
  	$( "#slider" ).slider({
			range: true,
			min: 0,
			max: 11000000,
			step: 1000000,
			values: [ 0, 11000000 ],
			slide: function( event, ui ) {
				updateSlider();
			},
			change: function( event, ui ) {
				updateSlider();
			}
	});

	var updateSlider = function() {
		$('#low_boundary').val($( "#slider" ).slider( "values", 0 ));
		$('#high_boundary').val($( "#slider" ).slider( "values", 1 ));
		$('#low_boundary_label').text($( "#slider" ).slider( "values", 0 ));
		$('#high_boundary_label').text($( "#slider" ).slider( "values", 1 ));
		$.get($("#players_search").attr("action"), $("#players_search").serialize(), null, "script");
	};


	$("#pitch .player").click(function(){

		var position = $(this).data("position");
		var player_id = teamPlayers[position].id;
		window.location = "/players/"+ player_id;
	});

});