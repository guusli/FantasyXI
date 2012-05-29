$(function() {

// Initierar Twitter-Bootstrap-modal
$('#myModal').modal({
  		keyboard: false
});

// Modal ska vara gömd från start 
$('#myModal').modal('hide');



	$('#invite_table .inviteButton').click(function() {
		var pressed = $(this); // knappen som tryckts på
		var uid = pressed.data('uid'); // facebook id
		var league_id = pressed.data('leagueid');
		$(this).button('loading'); // Ändrar state på knappen
		// Kör send_invite - action
		$.getScript("/send_invite?uid=" + uid + "&league_id=" + league_id, function(data){
				pressed.button('complete');
				pressed.text("Inbjudan skickad.")
				pressed.addClass("btn-success");
		});

	});

});