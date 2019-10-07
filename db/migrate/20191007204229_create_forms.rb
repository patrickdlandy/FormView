class CreateForms < ActiveRecord::Migration[5.2]
  def change
    create_table :forms do |t|
      t.string :name, null: false
      t.integer :user_id, null: false
      t.string :description, null: false
      t.timestamps
    end
    add_index(:forms, :name, unique: true)
    add_index(:forms, :user_id)
  end
end
