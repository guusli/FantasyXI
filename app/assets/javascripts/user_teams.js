$(function() {
  	$( "#slider" ).slider({
			range: true,
			min: 0,
			max: 2000000,
			step: 100000,
			values: [ 0, 2000000 ],
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


		});


$(function(){
	

	$("#pitch .player").click(function(){
		var position = $(this).bata("position");
		var player_id = teamPlayers[position].id;
		$.get('/player_info.js', {'player_id': player_id});
	});

});

$(function(){
	$('#infoModal').modal({
  		keyboard: false
	});

	$('#infoModal').on('show', function () {
		
	});

	$('#infoModal').modal('hide')

});

