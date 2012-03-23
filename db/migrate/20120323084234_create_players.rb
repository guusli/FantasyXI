class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.integer :points
      t.integer :goals
      t.integer :assists
      t.integer :red
      t.integer :yellow

      t.timestamps
    end
  end
end
