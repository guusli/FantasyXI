class CreateAcquisitions < ActiveRecord::Migration
  def change
    create_table :acquisitions do |t|

    	t.integer :user_team_id
    	t.integer :player_id

      	t.timestamps
    end
  end
end
