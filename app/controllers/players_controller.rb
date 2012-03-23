class PlayersController < ApplicationController

	def index
		@players = Player.order(params[:sort])
		@player = Player.new
	end

	def show
		@player = Player.find params[:id]
	end
end
