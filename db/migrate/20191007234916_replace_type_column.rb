class ReplaceTypeColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column(:elements, :type)
    add_column(:elements, :element_type, :string, null: false)
  end
end
