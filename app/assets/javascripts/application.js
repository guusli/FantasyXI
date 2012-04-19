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

	var player_name;
	$(".player").hover(function() {
		console.log(this);
		player_name = this.children[1].innerText;
		$(this.children[1]).html("<a class='btn btn-danger btn-mini'>Ta bort </a><a class='btn btn-mini'>Mer Info </a>");
		}, function() {
			$(this.children[1]).html(player_name.replace(" ", "\n"));
		}
	);
});

$(function() {

	var positions = ["GK","DF","MF","FW"];

	var squad_players = $.parseJSON($("#teamplayers").val());

	console.log(squad_players);
	
	var gk_count = 0;
	var df_count = 0;
	var mf_count = 0;
	var fw_count = 0;

	if(squad_players) {
	$.each(squad_players, function(i, player) {


		var new_player = new Player(player.id, player.name, countries[player.team_id-1], player.position);


		if(player.position == "GK") {

			var kit_url = '/assets/kits/thumbs/' + countries[player.team_id-1] + 'thumb.png';
			$('.gk_' + gk_count + ' .kit').css('background-image',"url('" + kit_url + "')");
			var name = player.name.replace(" ", "\n");
			//console.log(name);
			$('.gk_' + gk_count + ' .player_name').text(name);

			teamPlayers["GK"][gk_count] = new_player;

			gk_count++;
		}
		else if(player.position == "DF") {

			var kit_url= '/assets/kits/thumbs/' + countries[player.team_id-1] + 'thumb.png';
			$('.df_' + df_count + ' .kit').css('background-image',"url('" + kit_url + "')");
			var name = player.name.replace(" ", "\n");
			//console.log(name);
			$('.df_' + df_count + ' .player_name').text(name);

			teamPlayers["DF"][df_count] = new_player;

			df_count++;
		}
		else if(player.position == "MF") {
			var kit_url = '/assets/kits/thumbs/' + countries[player.team_id-1] + 'thumb.png';
			$('.mf_' + mf_count + ' .kit').css('background-image',"url('" + kit_url + "')");
			var name = player.name.replace(" ", "\n");
			//console.log(name);
			$('.mf_' + mf_count + ' .player_name').text(name);

			teamPlayers["MF"][mf_count] = new_player;

			mf_count++;
		}
		else if(player.position == "FW") {
			var kit_url = '/assets/kits/thumbs/' + countries[player.team_id-1] + 'thumb.png';
			$('.fw_' + fw_count + ' .kit').css('background-image',"url('" + kit_url + "')");
			var name = player.name.replace(" ", "\n");
			//console.log(name);
			$('.fw_' + fw_count + ' .player_name').text(name);

			teamPlayers["FW"][fw_count] = new_player;

			fw_count++;
		}

		$('#teamplayers').val(JSON.stringify(teamPlayers));

	});

	}

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

		if(positions.length < 1) {
			$.getScript(this.href);
			return false;
		}
		else {
			console.log(positions);
			$.getScript("?positions=" + positions.toString());
			return false;
		}

	});
});


$(function() {
	$('#post_team_select').change(function() {
  		var team_id = this.value;
  		$.getScript("?team_id=" + team_id); 	
	});
});


	var teamPlayers = {};
	teamPlayers.GK = [];
	teamPlayers.DF = [];
	teamPlayers.MF = [];
	teamPlayers.FW = [];
	var draggedPlayer;


function Player(id, name, country, position) {
	this.id = id;
	this.name = name;
	this.country = country;
	this.position = position;
}

function handleDragStart(e) {
		  //e.srcElement.style.opacity = '0.4';

		  var id = e.target.getAttribute('id').match(/\d+/)[0];
		  var name = e.target.children[0].innerText;
		  var position = e.target.children[2].innerText;
		  var country = e.target.children[3].innerText;


		  draggedPlayer = new Player(id, name, country, position);


		handleMarked();


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

			//console.log(dragIcon);
		   e.originalEvent.dataTransfer.setDragImage(dragIcon, 25,25);
}

function handleDragOver(e) {
			e.preventDefault();

}

function handleDrop(e) {


			var player_parent = e.target.parentElement.className.split(" ")[1].match(/\d+/)[0];
			
			teamPlayers[draggedPlayer.position][player_parent] = draggedPlayer;


			$("#teamplayers").val(JSON.stringify(teamPlayers));



			var kit_url = '/assets/kits/thumbs/' + draggedPlayer.country.toLowerCase() + 'thumb.png';
			//console.log("url('" + kit_url + "')" );

			//console.log(e);

			$(e.currentTarget.children[0]).css('background-image',"url('" + kit_url + "')");
			var name = draggedPlayer.name.replace(" ", "\n");
			//console.log(name);
			$(e.currentTarget.children[1]).text(name);

			handleMarked();


			// Koppla bort eventet
			$("#pitch .player").each(function(index, box) {
			$(box).unbind('dragover');
			$(box).bind('drop');
			$(box).unbind('dragleave');
		});


			//$("#" + msg).css('opacity', '1.0');
		}


function handleDragLeave(e) {
	e.preventDefault();

}

function handleMarked() {
		$.each(teamPlayers["GK"], function(index, player) {
				if(player){
					$("tr#player_"+ player.id).addClass("marked");
					$("tr#player_"+ player.id).attr('draggable','false');
				}
			});
			$.each(teamPlayers["DF"], function(index, player) {
				if(player){
					$("tr#player_"+ player.id).addClass("marked");
					$("tr#player_"+ player.id).attr('draggable','false');
				}
			});
			$.each(teamPlayers["MF"], function(index, player) {
				if(player){
					$("tr#player_"+ player.id).addClass("marked");
					$("tr#player_"+ player.id).attr('draggable','false');
				}
			});
			$.each(teamPlayers["FW"], function(index, player) {
				if(player){
					$("tr#player_"+ player.id).addClass("marked");
					$("tr#player_"+ player.id).attr('draggable','false');
				}
			});
}