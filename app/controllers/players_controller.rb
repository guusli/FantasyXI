class PlayersController < ApplicationController

	def index
		@players = Player.all
		@player = Player.new
	end
end
