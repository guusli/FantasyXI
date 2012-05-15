	// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require_tree .
//= require jquery.ui.all


var kits = {};
var countries = "danmark,england,frankrike,grekland,holland,irland,italien,kroatien,polen,portugal,ryssland,spanien,sverige,tjeckien,tyskland,ukraina".split(",");
$(function() {

	preloads = countries;

	$.each(preloads, function(x, c) {
	    kits[c] = new Image();
	    kits[c].src = "/assets/kits/thumbs/" + preloads[x] + "thumb.png";
	});
});

$(function() {
	$("#players_table tr").each(function(index, player) {
			$(player).bind('dragstart', handleDragStart);
		});
});


$(function() {

	$('.disabled').click(function(e) {
		e.preventDefault();
	});


	$('#name_input').click(function() {
		$(this).css('color','#333');
		$(this).val('');
	});

	$("#name_input").keyup(function() {
		$("#teamname_hidden").val($("#name_input").val());
	});

	/*var player_name;
	$("#pitch .player").click(function() {
		player_name = this.children[1].innerText;
		$('#myModal').modal('show')
		$('#myModal h3').text(teamPlayers["GK"][0].name);
		$('#myModal .modal-body').html();

	});*/

});

$(function() {

	var positions = ["GK","DF","MF","FW"];

	var squad_players = $.parseJSON($("#teamplayers").val());

	if(squad_players) {
	$.each(squad_players, function(i, player) {

		var new_player = new Player(player.id, player.name, countries[player.team_id-1], player.position, player.price );

			var kit_url = '/assets/kits/thumbs/' + countries[player.team_id-1] + 'thumb.png';
			$('.player_' + i + ' .kit').css('background-image',"url('" + kit_url + "')");
			var name = player.name.replace(" ", "\n");
			$('.player_' + i + ' .player_name').text(name);

			teamPlayers[i] = new_player;

	});

	}

	$(function(){

		var sub_players = $.parseJSON($("#substitutions").val());
		if(sub_players)
		{
			$.each(sub_players, function(i, s){
				var player_in = new Player(s.player_in.id, s.player_in.name, countries[s.player_in.team_id-1], s.position, s.player_in.price);
				var player_out = new Player(s.player_out.id, s.player_out.name, countries[s.player_out.team_id-1], s.position, s.player_out.price);
				var new_sub = new Substitution(player_in, player_out, s.position);

				substitution[new_sub.position] = new_sub;
				draw_subs(new_sub);

			})
		}
		//clickSub();
	});

	$("#players th a, #players .pagination a").live("click", function(){
		$.getScript(this.href);
		return false;
	});
	$("#players_search input").keyup(function() {
    	$.get($("#players_search").attr("action"), $("#players_search").serialize(), null, "script");
    return false;
  });

	$('.position_check').change(function() {

		positions = [];

		if ($('#gk_check:checked').val() !== undefined) {
  			positions.push("GK");
		}
		if ($('#df_check:checked').val() !== undefined) {
  			positions.push("DF");
		}
		if ($('#mf_check:checked').val() !== undefined) {
  			positions.push("MF");
		}
		if ($('#fw_check:checked').val() !== undefined) {
  			positions.push("FW");
		}

			if(positions.length > 0) {
				$('#positions').val(positions.toString());
				$.get($("#players_search").attr("action"), $("#players_search").serialize(), null, "script");
			}
			else {
				$('#players_table tbody').html("");
				$('.pagination').html("");
				$('#positions').val("");
				$.get($("#players_search").attr("action"), $("#players_search").serialize(), null, "script");
			}

			return false;
	});
});


$(function() {
	$('#players_search #team_id').change(function() {
  		$.get($("#players_search").attr("action"), $("#players_search").serialize(), null, "script");	
	});
});

	var substitution = [];
	var teamPlayers = [];
	var draggedPlayer;
	var sub = [];
	var undo_position = [];

function Player(id, name, country, position, price) {
	this.id = id;
	this.name = name;
	this.country = country;
	this.position = position;
	this.price = price;
}

function Substitution(player_in, player_out, position) {
	this.player_in = player_in;
	this.player_out = player_out;
	this.position = position;
}

function handleDragStart(e) {

		  var id = e.target.getAttribute('id').match(/\d+/)[0];
		  var name = e.target.children[0].innerText;
		  var price = e.target.children[1].innerText;
		  var position = e.target.children[2].innerText;
		  var country = e.target.children[3].innerText;


		  draggedPlayer = new Player(id, name, country, position, price);

		 // Koppla event beroende på position
		 var player_position;
		if (draggedPlayer.position == "GK") player_position = "#goalie";
		else if(draggedPlayer.position == "DF") player_position = "#defense";
		else if (draggedPlayer.position == "MF") player_position = "#midfield";
		else if (draggedPlayer.position == "FW") player_position = "#forwards";

		$(player_position + " .player").each(function(index, box) {
			$(box).bind('dragover', handleDragOver);
			$(box).bind('drop', handleDrop);
			$(box).bind('dragleave', handleDragLeave);
		});

 		e.originalEvent.dataTransfer.setData("text/plain", e.target.children[3].innerText);

		  var dragIcon = kits[draggedPlayer.country.toLowerCase()]

		   e.originalEvent.dataTransfer.setDragImage(dragIcon, 25,25);
}

function handleDragOver(e) {
			e.preventDefault();

}

function handleDrop(e) {

	
			var player_number = e.target.parentElement.className.split(" ")[1].match(/\d+/)[0];

			if(teamPlayers[player_number]){
			var oldPlayer = teamPlayers[player_number];
			if(oldPlayer.id == draggedPlayer.id || sub.length == 3)
			{
				return true;
			}
			}
			teamPlayers[player_number] = draggedPlayer;

			$("#teamplayers").val(JSON.stringify(teamPlayers));

			var kit_url = '/assets/kits/thumbs/' + draggedPlayer.country.toLowerCase() + 'thumb.png';

			$(e.currentTarget.children[0]).css('background-image',"url('" + kit_url + "')");
			var name = draggedPlayer.name.replace(" ", "\n");

			$(e.currentTarget.children[1]).text(name);

			// Koppla bort eventet
			$("#pitch .player").each(function(index, box) {
			$(box).unbind('dragover');
			$(box).bind('drop');
			$(box).unbind('dragleave');

		});
		// Uppdatera pris

		var bank = parseInt($('#bank').text());
		//alert(typeof(bank));
		if(oldPlayer) {
			var priceDiff = draggedPlayer.price - oldPlayer.price;
			substitution[player_number] = new Substitution(draggedPlayer, oldPlayer, player_number);
			sub = $.map(substitution, function(s,i){
				return s;
			});
			$("#subs").html("");
			$.each(sub, function(i,s){
				draw_subs(s);
			})
		}
		else {
			priceDiff = draggedPlayer.price
		}

		$("#substitutions").val(JSON.stringify(sub));

		$('#bank').text(parseInt(bank) - priceDiff);
		handleMarked();
}

function clickSub() {
			$("#subs .btn-sub").click(function() {
				var position = $(this).data('position');

				teamPlayers[position] = substitution[position].player_out;
				handleMarked();

				var kit_url = '/assets/kits/thumbs/' + substitution[position].player_out.country.toLowerCase() + 'thumb.png';

				$(".player_"+position+" .kit").css('background-image',"url('" + kit_url + "')");
				var name = substitution[position].player_out.name.replace(" ", "\n");

				$(".player_"+position+" .player_name").text(name);
				delete substitution[position];
				

				var subs = $.map(substitution, function(s,i){
				return s;
				});

				undo_position.push(position);
				$("#undo_sub_pos").val(JSON.stringify(undo_position));
				$("#teamplayers").val(JSON.stringify(teamPlayers));
				$("#substitutions").val(JSON.stringify(subs));	

				$("#subs").html("");

				$.each(substitution, function(i, s){
					if(s)
						draw_subs(s);
				});
				$.get('undo_substitution.js', {'position': position});				
				});
}

	function draw_subs (s){
				var sub_div = $("<div class='sub'></div>");
				sub_div.data('postion', s.position);
				sub_div.append("<img src='/assets/icons/green_arrow.png'/> ")
				sub_div.append(s.player_in.name);
				sub_div.append("</br>")
				sub_div.append("<img src='/assets/icons/red_arrow.png'/> ")
				sub_div.append(s.player_out.name);
				sub_div.append("</br>")
				sub_div.append("<a class='btn btn-danger btn-sub' data-position='"+s.position+"'>Ångra</a>")
				$("#subs").append(sub_div);
				clickSub();
			}

function handleDragLeave(e) {
	e.preventDefault();
}


function handleMarked() {
	$('#players_table tr').each(function() {
		$('#players_table tr td').removeClass("marked");
		$(this).attr('draggable','true');
	});
	$.each(teamPlayers, function(index, player) {
		if(player){
			$("tr#player_"+ player.id + " td").addClass("marked");
			$("tr#player_"+ player.id).attr('draggable','false');
			//$("tr#player_"+ player.id + " td").last().removeClass("marked");
		}
	});
}

