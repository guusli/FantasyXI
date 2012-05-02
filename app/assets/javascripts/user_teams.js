$(function(){

	$("#pitch .player").click(function(){

		var position = $(this).data("position");
		var player_id = teamPlayers[position].id;
		window.location = "/players/"+ player_id;
	});


});