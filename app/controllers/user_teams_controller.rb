class UserTeamsController < ApplicationController

	helper_method :sort_column, :sort_direction, :team_id, :positions, :low_boundary, :high_boundary

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
			.search(params[:search]).where(:team_id => team_id, :position => positions, :price =>low_boundary..high_boundary).order(sort_column + " " + sort_direction).paginate(:per_page => 10, :page => params[:page])
		else

			@players = Player.joins(:player_stats)
			.select("players.*, sum(player_stats.points) as points").group("players.id")
			.search(params[:search]).where(:position => positions, :price =>low_boundary..high_boundary)
			.order(sort_column + " " + sort_direction).paginate(:per_page => 10, :page => params[:page])
		end

		@sub_hash = []
		@user_team.substitutions.each do |s|
			hash = Hash.new
			#player_in = Player.joins(:team).select('players.*, teams.name as country').where(:id => s.player_in)
			#player_out = Player.joins(:team).select('players.*, teams.name as country').where(:id => s.player_out)
			player_in = Player.find(s.player_in)
			player_out = Player.find(s.player_out)
			hash['player_in'] = player_in
			hash['player_out'] = player_out
			hash['position'] = s.position
			@sub_hash.push(hash)
		end
	end
	end

	def player_info
		@player = Player.joins(:player_stats)
				.select("players.* 
					, sum(player_stats.points) as sum_points
					, sum(player_stats.red) as sum_red
					, sum(player_stats.yellow) as sum_yellow
					, sum(player_stats.assists) as sum_assists
					, sum(player_stats.goals) as sum_goals")
				.where(:id => params[:player_id])
				.group("players.id")
				.first

		@player_round = Player.find(params[:player_id]).player_stats
	end

	def save_team

		flash[:notice] = "Ditt lag har uppdaterats"

		if current_user.user_teams.empty?
			6.times do |round|
				current_user.user_teams.push(UserTeam.create(:name => params[:teamname], :points => 0, :round => round + 1))
			end
			flash[:notice] = "Ditt lag har skapats"
		end

		@user_team = current_user.user_teams[0]

		@user_team.players.destroy_all
		j = ActiveSupport::JSON
		teamplayers = j.decode(params[:teamplayers])
		substitutions = j.decode(params[:substitutions])

		teamplayers.each do |player|
			p = Player.find(player['id'])
			@user_team.players.push(p)
		end
		@user_team.substitutions.destroy_all

		substitutions.each do |sub|
			@user_team.substitutions.push(Substitution.create(:player_in => sub['player_in']['id'], :player_out => sub['player_out']['id'], :position => sub['position']))
		end
	end

	def undo_substitution
		user_team = current_user.user_teams[0];
		user_team.substitutions.where(:position => params[:position]).destroy_all

		redirect_to user_teams_path
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

	def low_boundary
		params[:low_boundary] || 0
	end

	def high_boundary
		params[:high_boundary] || 11_000_000
	end
  


  def sort_column
  	params[:sort] || "name"
  end
  
  def sort_direction
  	params[:direction] || "asc"
  end

end
