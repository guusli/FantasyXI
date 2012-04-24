class AddPointsToUserTeam < ActiveRecord::Migration
    def self.up
    change_table :user_teams do |t|
      t.integer :points
    end
    drop_table :user_team_stats
end

end
