class CreateSubstitutions < ActiveRecord::Migration
  def change
    create_table :substitutions do |t|

    t.integer :user_team_id
    t.integer :player_in
    t.integer :player_out
    t.integer :position


      t.timestamps
    end
  end
end
