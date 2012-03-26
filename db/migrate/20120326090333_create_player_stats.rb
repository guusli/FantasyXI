class CreatePlayerStats < ActiveRecord::Migration
  def change
    create_table :player_stats do |t|

    t.integer :points
      t.integer :goals
      t.integer :assists
      t.integer :red
      t.integer :yellow
      t.integer :round

      t.references :player

      t.timestamps
    end

    add_index :player_stats, :player_id
  end
end
