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

		  e.originalEvent.dataTransfer.setData("text/plain", e.target.getAttribute('id'));
		  var dragIcon = document.createElement('img');
			dragIcon.src = 'assets/kits/danmark_thumb.png';
		  e.originalEvent.dataTransfer.setDragImage(dragIcon, 25,25);
}

function handleDragOver(e) {
			e.preventDefault();

			$(e.currentTarget).css('border','2px dashed black');
}

function handleDrop(e) {
			var msg = e.originalEvent.dataTransfer.getData("text/plain");

			$(e.currentTarget).css('background', msg);
			$(e.currentTarget).css('border','');

			$("#" + msg).css('opacity', '1.0');
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