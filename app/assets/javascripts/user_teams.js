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


	

	$("#pitch .player").click(function(){
		var position = $(this).data("position");
		var player_id = teamPlayers[position].id;
		$.get('/player_info.js', {'player_id': player_id});
	});


	$('#infoModal').modal({
  		keyboard: false
	});

	$('#infoModal').on('show', function () {
		
	});

	$('#infoModal').modal('hide');

	$("#save_form").submit(function() {
		if(teamPlayers.map(function(p,i){if(p) return 1;}).reduce(function(v,sum) { return  v + sum},0) < 11) {
			$("#pitch_alert").html("Vänligen fyll hela laget.");
			$("#pitch_alert").addClass('alert-danger');
			$("#pitch_alert").removeClass('alert-info');
			return false;
		}
		else if($('#name_input').val() == "Namn" || $('#name_input').val() == "" ) {
			$("#pitch_alert").html("Vänligen fyll i lagnamn.");
			$("#pitch_alert").addClass('alert-danger');
			$("#pitch_alert").removeClass('alert-info');
			return false;
		}
	});

});

