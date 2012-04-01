class User < ActiveRecord::Base

	has_many :league, :through => :league_membership

	def self.create_with_omniauth(auth)
		create! do |user|
			user.provider = auth["uid"]
			user.uid = auth["uid"]
			user.name = auth["info"]["name"]
		end
	end
end
