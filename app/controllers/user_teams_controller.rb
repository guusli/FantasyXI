class UserTeamsController < ApplicationController

	helper_method :sort_column, :sort_direction

	def index
		@user_teams = UserTeam.all

	end

	def show
	if current_user
		if not current_user.user_teams.empty?
			@user_team = current_user.user_teams[0]

			@user_team_ids = @user_team.players.map do |p|
				p.id
			end
		else
			@user_team = UserTeam.new
		end
		
		if team_id
			@players = Player.where(:team_id => team_id).order(sort_column + " " + sort_direction).paginate(:per_page => 15, :page => params[:page])
		else	
			@players = Player.search(params[:search]).order(sort_column + " " + sort_direction).paginate(:per_page => 15, :page => params[:page])
		end
	end
	end

	def change_formation
	end

	def save_team

		flash[:notice] = "Ditt lag har uppdaterats"

		if current_user.user_teams.empty?
			current_user.user_teams.push(UserTeam.create(:name => params[:teamname], :points => 0))
			flash[:notice] = "Ditt lag har skapats"
		end

		@user_team = current_user.user_teams[0]

		@user_team.players.destroy_all
		j = ActiveSupport::JSON
		teamplayers = j.decode(params[:teamplayers])

		teamplayers.each do |player|
			p = Player.find(player['id'])
			@user_team.players.push(p)
		end
	end

	private

	def team_id
		params[:team_id] || nil
	end

	def positions
		params[:positions] || "XX"
	end
  
  def sort_column
  	params[:sort] || "name"
  end
  
  def sort_direction
  	params[:direction] || "asc"
  end

end
