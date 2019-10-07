class CreateElements < ActiveRecord::Migration[5.2]
  def change
    create_table :elements do |t|
      t.string :title, null: false
      t.integer :form_id, null: false
      t.string :body, null: false
      t.integer :order, null: false
      t.string :type, null: false
      t.timestamps
    end
    add_index(:elements, :form_id)
  end
end
