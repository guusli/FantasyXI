	task :load_stats => :environment  do
	    csv_text = File.read('stats.csv')
		csv = CSV.parse(csv_text, :headers => true)
		round = Fantasyxi::Application::ROUND # Runda
		csv.each_with_index do |row, index|
			row = row.to_hash.symbolize_keys
			p = Player.find(index+3242)
			points = 2* row[:goals].to_i +
						row[:assists].to_i -
						2* row[:red].to_i -
						row[:yellow].to_i

			points = 0 if not points

			p.player_stats[round].update_attributes(:points => points,
													:goals => row[:goals].to_i,
													:assists => row[:assists].to_i,
													:yellow => row[:yellow].to_i,
													:red => row[:red].to_i)
		end

		UserTeam.where(:round => round).each do |u|
			points = u.players.map{ |p| p.player_stats[round].points}.reduce(:+)
			u.update_attributes(:points => points)
		end

		User.all.each do |u|
			u.user_teams[round ].players = u.user_teams[round-1].players
		end

	end