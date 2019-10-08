class CreateOptions < ActiveRecord::Migration[5.2]
  def change
    create_table :options do |t|
      t.string :title, null: false
      t.integer :element_id, null: false
      t.string :body, null: false
      t.integer :order, null: false
      t.string :option_type, null: false
      t.timestamps
    end
    add_index(:options, :element_id)
  end
end
