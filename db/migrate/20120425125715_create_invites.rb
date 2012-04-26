class CreateInvites < ActiveRecord::Migration
  def change
    create_table :invites do |t|

    	t.integer :league_id
    	t.integer :user_id
    	t.integer :sender_id

      t.timestamps
    end
  end
end
