class UserTeamsController < ApplicationController
	def index
		@user_teams = UserTeam.all
	end

	def show
		@user_team = current_user.user_team
	end
end