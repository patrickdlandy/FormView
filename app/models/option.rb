# == Schema Information
#
# Table name: options
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  element_id  :integer          not null
#  body        :string           not null
#  order       :integer          not null
#  option_type :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Option < ApplicationRecord

    validates :title, null: false
    validates :element_id, null: false
    validates :body, null: false
    validates :order, null: false
    validates :option_type, null: false

    belongs_to(
        :element,
        primary_key: :id,
        foreign_key: :element_id,
        class_name: :Element
    )

    has_many(
        :responses,
        primary_key: :id,
        foreign_key: :option_id,
        class_name: :Response
    )
    
end
