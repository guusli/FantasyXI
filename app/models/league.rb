class League < ActiveRecord::Base
	has_many :league_membership
	has_many :users, :through => :league_membership

	def self.search(search)
	  if search
	    find(:all, :conditions => ['name LIKE ?', "%#{search}%"])
	  else
	    find(:all)
	  end
	end
end
