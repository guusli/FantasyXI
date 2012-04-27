class LeaguesController < ApplicationController

	require "fb_graph"

	def index
		@leagues = League.search(params[:search])
		#raise session.to_yaml
	end

	def show
		@members = User.joins(:leagues,:user_teams)
				.select("users.*
					, user_teams.name as user_team
					,leagues.name as league_name
					,leagues.admin_id as admin_id
					, sum(user_teams.points) as points")
				.group("users.id").where(:leagues => {:id => params[:id]}).order('points DESC')

		if(current_user && @members.find_by_id(current_user.id))
			@member = true
		else
			@member = false
		end

		@admin = current_user.id == @members.first.admin_id
	end

	def new
		@league = League.new
	end

	def create
		l = League.create params[:league]
		LeagueMembership.create(:league_id => l.id, :user_id => current_user.id)
		redirect_to l
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

	def remove_user
		u = User.find(params[:user_id])
		@league = League.find params[:id]
		@league.users.delete(u)
		redirect_to :back
	end

end
