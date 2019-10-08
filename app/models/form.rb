# == Schema Information
#
# Table name: forms
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  user_id     :integer          not null
#  description :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Form < ApplicationRecord

    validates :name, presence: true, uniqueness: true
    validates :user_id, presence: true
    validates :description, presence: true

    belongs_to(
        :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User
    )

    has_many(
        :elements,
        primary_key: :id,
        foreign_key: :form_id,
        class_name: :Element
    )


end
