class UserTeamsController < ApplicationController

	helper_method :sort_column, :sort_direction

	def index
		@user_teams = UserTeam.all

	end

	def show
		@user_team = current_user.user_team if current_user
		
		if team_id
			@players = Player.where(:team_id => team_id).order(sort_column + " " + sort_direction)
		else	
			@players = Player.order(sort_column + " " + sort_direction)
		end
	end

	private

	def team_id
		params[:team_id] || nil
	end
  
  def sort_column
  	params[:sort] || "name"
  end
  
  def sort_direction
  	params[:direction] || "asc"
  end
end
