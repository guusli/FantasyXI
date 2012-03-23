class PlayersController < ApplicationController

	def index
		@players = Player.order(params[:sort])
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
  		Player.update(p.id, :goals => '0', :points =>'0',:position => '2', :yellow =>'0' , :red =>'0', :assists => '0')
  		redirect_to :back
  	end

end
