# == Schema Information
#
# Table name: responses
#
#  id         :bigint           not null, primary key
#  option_id  :integer          not null
#  identifier :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Response < ApplicationRecord

  validates :option_id, null: false
  validates :identifier, null: false

  belongs_to(
    :option,
    primary_key: :id,
    foreign_key: :option_id,
    class_name: :Option
  )

end
