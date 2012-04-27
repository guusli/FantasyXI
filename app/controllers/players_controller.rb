class PlayersController < ApplicationController
	helper_method :sort_column, :sort_direction
				

	def index
		#@players = Player.search(params[:search]).order(sort_column + " " + sort_direction).paginate(:per_page => 20, :page => params[:page])
		
		if not params[:round]
			@players = Player.joins(:player_stats)
				.select("players.* 
					, sum(player_stats.points) as points
					, sum(player_stats.red) as red
					, sum(player_stats.yellow) as yellow
					, sum(player_stats.assists) as assists
					, sum(player_stats.goals) as goals")
				.group("players.id")
				.search(params[:search])
				.order(sort_column + " " + sort_direction)
				.paginate(:per_page => 20, :page => params[:page])
		else
			 @players = Player.joins(:player_stats)
			 	.select("players.* 
			 		, player_stats.points as points
			 		, player_stats.goals as goals
			 		, player_stats.assists as assists
			 		, player_stats.red as red
			 		, player_stats.yellow as yellow")
			 	.group("players.id")
			 	.where(:player_stats => {:round => params[:round]})
			 	.search(params[:search])
			 	.order(sort_column + " " + sort_direction)
				.paginate(:per_page => 20, :page => params[:page])
		end


		@player = Player.new
	end

	def show
		if not params[:round]
			@player = Player.joins(:player_stats)
				.select("players.* 
					, sum(player_stats.points) as points
					, sum(player_stats.red) as red
					, sum(player_stats.yellow) as yellow
					, sum(player_stats.assists) as assists
					, sum(player_stats.goals) as goals")
				.where(:id => params[:id])
				.group("players.id")
				.first
		else
			 @player = Player.joins(:player_stats)
			 	.select("players.* 
			 		, player_stats.points as points
			 		, player_stats.goals as goals
			 		, player_stats.assists as assists
			 		, player_stats.red as red
			 		, player_stats.yellow as yellow")
			 	.group("players.id")
			 	.where(:player_stats => {:round => params[:round]}, :id => params[:id])
				.first
		end
	end

	def new
		@player = Player.new
	end

	def create
  		p = Player.create params[:player]
  		redirect_to :back
  	end

  private
  
  def sort_column
  	params[:sort] || "name"
  end
  
  def sort_direction
  	params[:direction] || "asc"
  end
end
