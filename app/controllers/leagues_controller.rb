class LeaguesController < ApplicationController

	def index
		@leagues = League.all
	end

	def show
		@league = League.find params[:id]
	end

	def join
		LeagueMembership.create(:league_id => params[:id], :user_id => current_user.id)
		redirect_to leagues_path
	end
end
