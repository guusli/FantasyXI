	task :load_players => :environment  do
	    csv_text = File.read('players.csv')
		csv = CSV.parse(csv_text, :headers => true)
		csv.each do |row|
			row = row.to_hash.symbolize_keys
			p = Player.create(row)
			6.times do |round|
				p.player_stats.push(PlayerStat.create(:points => '0', :goals => '0', :assists => '0', :red => '0' , :yellow => '0', :round => round+1))
			end
		end
	end