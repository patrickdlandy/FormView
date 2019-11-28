class CreateReponses < ActiveRecord::Migration[5.2]
  def change
    create_table :responses do |t|
      t.integer :option_id, null: false
      t.string :identifier, null: false
      t.timestamps
    end
    add_index(:responses, :option_id)
  end
end
