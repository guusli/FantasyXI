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







$(function() {
	$('#players_search #team_id').change(function() {
  		$.get($("#players_search").attr("action"), $("#players_search").serialize(), null, "script");	
	});

//Klickad med ett live-event, live för att den ska uppdatera js koden när man har klickat på kolumnerna eller pagination.
$("#players th a, #players .pagination a").live("click", function(){
		$.getScript(this.href);
		return false;
	});
	$("#players_search input").keyup(function() {
    	$.get($("#players_search").attr("action"), $("#players_search").serialize(), null, "script");
    return false;
});
});


