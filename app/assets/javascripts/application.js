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

$(function() {
	$("#players th a, #players .pagination a").live("click", function(){
		$.getScript(this.href);
		return false;
	});
	  $("#players_search input").keyup(function() {
    $.get($("#players_search").attr("action"), $("#players_search").serialize(), null, "script");
    return false;
  });
});


function handleDragStart(e) {
		  e.srcElement.style.opacity = '0.4';

 	e.originalEvent.dataTransfer.setData("text/plain", e.target.children[3].innerText);
		  var dragIcon = document.createElement('img');
			dragIcon.src = 'http://localhost:3000/assets/kits/'+ e.target.children[3].innerText.toLowerCase()+ 'thumb.png';
		  e.originalEvent.dataTransfer.setDragImage(dragIcon, 40,40);
}

function handleDragOver(e) {
			e.preventDefault();

			$(e.currentTarget).css('background','red');
}

function handleDrop(e) {
			var player_country = e.originalEvent.dataTransfer.getData("text/plain");


			var kit_url = 'http://localhost:3000/assets/kits/' + player_country.toLowerCase() + 'thumb.png';
			console.log("url('" + kit_url + "')" );

			$(e.currentTarget).css('background','transparent');
			$(e.currentTarget).css('background-image',"url('" + kit_url + "')");


			//$("#" + msg).css('opacity', '1.0');
		}


function handleDragLeave(e) {
	$(e.currentTarget).css('border','');

}

$(document).ready(function(){


			$("#players tr").each(function(index, player) {
				$(player).bind('dragstart', handleDragStart);
			});


			$("#pitch .player").each(function(index, box) {
				$(box).bind('dragover', handleDragOver);
				$(box).bind('drop', handleDrop);
				$(box).bind('dragleave', handleDragLeave);
			});
});