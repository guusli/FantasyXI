class LeaguesController < ApplicationController

	def index
		@leagues = League.search(params[:search])
	end

	def show
		@league = League.find params[:id]
		if(current_user && @league.users.find_by_id(current_user.id))
			@member = true
		else
			@member = false
		end
	end

	def join
		LeagueMembership.create(:league_id => params[:id], :user_id => current_user.id)
		redirect_to leagues_path
	end

	def leave
		@league = League.find params[:id]
		@league.users.delete(current_user)
		redirect_to leagues_path
	end
end
