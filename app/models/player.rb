class Player < ActiveRecord::Base
	belongs_to :team
	has_many :player_stats

	def self.search(search)
	  if search
	   where('name LIKE ?', "%#{search}%")
	  else
	    scoped
	  end
	end
end
