class League < ActiveRecord::Base
	has_many :league_membership
	has_many :users, :through => :league_membership
end
