class LeaguesController < ApplicationController

	require "fb_graph"

	def index
		@leagues = League.search(params[:search])
		#raise session.to_yaml
		@page = Nokogiri::HTML(open('https://graph.facebook.com/me/friends?access_token=' + session[:access_token] + '&fields=installed,name,picture'))
		@page = @page.to_s.scan(/\{.+\}\}/)
	end

	def show
		@members = User.joins(:leagues,:user_teams)
				.select("users.*, user_teams.name as user_team,leagues.name as league_name, sum(user_teams.points) as points")
				.group("users.id").where(:leagues => {:id => 1})

		if(current_user && @members.find_by_id(current_user.id))
			@member = true
		else
			@member = false
		end
	end

	def join
		LeagueMembership.create(:league_id => params[:id], :user_id => current_user.id)
		redirect_to :back
	end

	def leave
		@league = League.find params[:id]
		@league.users.delete(current_user)
		redirect_to leagues_path
	end
end
