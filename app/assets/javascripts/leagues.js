$(function() {

$('#myModal').modal({
  		keyboard: false
	});

	$('#myModal').on('show', function () {
		
	});

	$('#pitch .player .kit').popover();

	$('#myModal').modal('hide')

	$('#invite_table .inviteButton').click(function() {
		var pressed = $(this);
		var uid = pressed.data('uid');
		var league_id = pressed.data('leagueid');
		$(this).button('loading');
		$.getScript("/send_invite?uid=" + uid + "&league_id=" + league_id, function(data){
				pressed.button('complete');
				pressed.text("Inbjudan skickad.")
				pressed.addClass("btn-success");
		});

	});

});