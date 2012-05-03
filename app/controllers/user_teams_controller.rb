class UserTeamsController < ApplicationController

	helper_method :sort_column, :sort_direction, :team_id, :positions

	def index
		@user_teams = User.joins(:user_teams).select("users.*, user_teams.name as user_team, sum(user_teams.points) as points").group("users.id").order('points DESC')
	end

	def show

	if current_user
		if not current_user.user_teams.empty?
			@user_team = current_user.user_teams[0]

			#@user_team_ids = @user_team.players.map do |p|
				#p.id
			#end
			@points = current_user.user_teams.map(&:points).inject(0, :+)

			@bank = 11_000_000 - @user_team.players.map(&:price).inject(0, :+)
		else
			@user_team = UserTeam.new
		end

		
		if team_id.to_i > 0
			@players = Player.joins(:player_stats)
			.select("players.*, sum(player_stats.points) as points").group("players.id")
			.search(params[:search]).where(:team_id => team_id, :position => positions).order(sort_column + " " + sort_direction).paginate(:per_page => 15, :page => params[:page])
		else

			@players = Player.joins(:player_stats)
			.select("players.*, sum(player_stats.points) as points").group("players.id")
			.search(params[:search]).where(:position => positions)
			.order(sort_column + " " + sort_direction).paginate(:per_page => 15, :page => params[:page])
		end

	end
	end

	def player_info
		@player = Player.all.first
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
		if not (params[:gk_check] || params[:df_check] || params[:mf_check] || params[:fw_check])
			return ["GK", "DF","MF","FW"] 
		end

		pos = []

		if(params[:gk_check])
			pos.push "GK"
		end
		if(params[:df_check])
			pos.push "DF"
		end
		if(params[:mf_check])
			pos.push "MF"
		end
		if(params[:fw_check])
			pos.push "FW"
		end

		return pos
	end
  


  def sort_column
  	params[:sort] || "name"
  end
  
  def sort_direction
  	params[:direction] || "asc"
  end

end
