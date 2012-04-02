class CreateUserTeamStats < ActiveRecord::Migration
  def change
    create_table :user_team_stats do |t|

    	t.integer :points

    	t.integer :user_team_id

      t.timestamps
    end
  end
end
