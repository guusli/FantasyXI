class League < ActiveRecord::Base
	has_many :user, :through => :league_membership
end
