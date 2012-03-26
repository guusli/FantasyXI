class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.integer :position
      t.integer :price
      t.references :team

      t.timestamps
    end

    add_index :players, :team_id

  end
end
