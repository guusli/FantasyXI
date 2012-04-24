class LeaguesController < ApplicationController

	require "fb_graph"

	def index
		@leagues = League.search(params[:search])
		#raise session.to_yaml
		@page = Nokogiri::HTML(open('https://graph.facebook.com/me/friends?access_token=' + session[:access_token] + '&fields=installed,name,picture'))
		@page = @page.to_s.scan(/\{.+\}\}/)
	end

	def show
		@league = League.find params[:id]
		@members = User.find(:all, :conditions => ['leagues.id LIKE ?', params[:id]], :joins => [:leagues])

		if(current_user && @league.users.find_by_id(current_user.id))
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
