class UserTeam < ActiveRecord::Base
	belongs_to :user
	has_many :user_team_stats

	has_many :acquisitions
	has_many :players, :through => :acquisition
end
