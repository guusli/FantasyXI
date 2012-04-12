class UserTeamsController < ApplicationController
	def index
		@user_teams = UserTeam.all
	end

	def show
		@user_team = current_user.user_team if current_user
<<<<<<< HEAD

=======
>>>>>>> b0958824f3d1420f4a2b76d9457d085ca0d65d5b
	end
end
