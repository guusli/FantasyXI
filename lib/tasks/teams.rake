task :load_teams => :environment  do

	Team.create(:name => 'Danmark')
	Team.create(:name => 'England')
	Team.create(:name => 'Frankrike')
	Team.create(:name => 'Grekland')
	Team.create(:name => 'Holland')
	Team.create(:name => 'Irland')
	Team.create(:name => 'Italien')
	Team.create(:name => 'Kroatien')
	Team.create(:name => 'Polen')
	Team.create(:name => 'Portugal')
	Team.create(:name => 'Ryssland')
	Team.create(:name => 'Spanien')
	Team.create(:name => 'Sverige')
	Team.create(:name => 'Tjeckien')
	Team.create(:name => 'Tyskland')
	Team.create(:name => 'Ukraina')
end