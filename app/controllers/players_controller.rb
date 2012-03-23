class PlayersController < ApplicationController

	def index
		@players = Player.all
		@player = Player.new
	end

	def show
		@player = Player.find params[:id]
	end
end
