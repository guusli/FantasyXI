class Acquisition < ActiveRecord::Base
	belongs_to :user_team
	belongs_to :player
end
