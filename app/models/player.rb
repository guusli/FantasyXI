class Player < ActiveRecord::Base
	belongs_to :team

	def self.search(search)
	  if search
	   where('name LIKE ?', "%#{search}%")
	  else
	    scoped
	  end
	end
end
