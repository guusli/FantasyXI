class PlayersController < ApplicationController
	helper_method :sort_column, :sort_direction

	def index
		@players = Player.search(params[:search]).order(sort_column + " " + sort_direction).paginate(:per_page => 5, :page => params[:page])
		@player = Player.new
	end

	def show
		@player = Player.find params[:id]
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
