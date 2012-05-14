class Invite < ActiveRecord::Base
	belongs_to :user
	validates_uniqueness_of :user_id, :scope => :league_id
end
