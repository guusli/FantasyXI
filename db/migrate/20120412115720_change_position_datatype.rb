class ChangePositionDatatype < ActiveRecord::Migration
  def self.up
    change_table :players do |t|
      t.change :position, :string
    end
  end

  def self.down
    change_table :players do |t|
      t.change :count, :string
    end
  end
end
