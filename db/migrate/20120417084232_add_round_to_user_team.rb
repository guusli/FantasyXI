class AddRoundToUserTeam < ActiveRecord::Migration
  def self.up
    change_table :user_teams do |t|
      t.integer :round
    end
  end

  def self.down
      remove_column :user_teams, :round
  end
end
