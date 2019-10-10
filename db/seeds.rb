# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Form.destroy_all
Element.destroy_all
Option.destroy_all

User.create(username: 'marvin', email: 'm@endofworld', password: '123456')
Form.create(name: 'Tree Survey', user_id: 1, description: "This survey collects information about favorite trees.")
Element.create(title: 'Question 1', form_id: 1, body: "What is your favorite tree?", order: 1, element_type: "Multiple Choice")
Option.create(title: 'A', element_id: 1, body: "The Larch", order: 1, option_type: "Multiple Choice")
Option.create(title: 'B', element_id: 1, body: "The Birch", order: 2, option_type: "Multiple Choice")
Form.create(name: 'Energy Survey', user_id: 1, description: "This survey collects information about perceptions of energy consumption.")
Element.create(title: 'Question 1', form_id: 2, body: "What consumes more energy in your home?", order: 1, element_type: "Multiple Choice")
Option.create(title: 'A', element_id: 2, body: "Lighting", order: 1, option_type: "Multiple Choice")
Option.create(title: 'B', element_id: 2, body: "Heating", order: 2, option_type: "Multiple Choice")

User.create(username: 'demo-user', email: 'demo@aa.net', password: '123456')
Form.create(name: 'EV Driver Satisfaction Survey', user_id: 2, description: "This survey collects information about user experience and satisfaction with electric vehicles.")
Element.create(title: 'Question 1', form_id: 3, body: "How do you feel about the range of your vehicle?", order: 1, element_type: "Multiple Choice")
Option.create(title: 'A', element_id: 3, body: "Range is sufficient", order: 1, option_type: "Multiple Choice")
Option.create(title: 'B', element_id: 3, body: "Range is insufficient", order: 2, option_type: "Multiple Choice")


