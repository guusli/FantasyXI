class UserTeamsController < ApplicationController

	helper_method :sort_column, :sort_direction

	def index
		@user_teams = UserTeam.all

	end

	def show
		@user_team = current_user.user_team if current_user
		@players = Player.order(sort_column + " " + sort_direction)
	end

	private
  
  def sort_column
  	params[:sort] || "name"
  end
  
  def sort_direction
  	params[:direction] || "asc"
  end
end
