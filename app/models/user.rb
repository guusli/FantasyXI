class User < ActiveRecord::Base

	has_many :league_membership
	has_many :leagues, :through => :league_membership
	has_many :user_teams
	has_many :invites

	def self.create_with_omniauth(auth)
		create! do |user|
			user.provider = auth["uid"]
			user.uid = auth["uid"]
			user.name = auth["info"]["name"]
		end
	end
end
