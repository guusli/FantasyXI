class AddFormationToUserTeam < ActiveRecord::Migration
  def self.up
    change_table :user_teams do |t|
      t.integer :formation
    end
  end

  def self.down
      remove_column :user_teams, :formation
  end
end
