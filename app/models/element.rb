# == Schema Information
#
# Table name: elements
#
#  id           :bigint           not null, primary key
#  title        :string           not null
#  form_id      :integer          not null
#  body         :string           not null
#  order        :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  element_type :string           not null
#

class Element < ApplicationRecord

    validates :title, presence: true
    validates :form_id, presence: true
    validates :body, presence: true
    validates :order, presence: true
    validates :element_type, presence: true

    belongs_to(
        :form,
        primary_key: :id,
        foreign_key: :form_id,
        class_name: :Form
    )

    has_many(
        :options,
        primary_key: :id,
        foreign_key: :element_id,
        class_name: :Option
    )

end
