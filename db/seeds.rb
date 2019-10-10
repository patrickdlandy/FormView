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

first_user = User.create(username: 'marvin', email: 'm@endofworld', password: '123456')
first_form = Form.create(name: 'Tree Survey', user_id: first_user.id, description: "This survey collects information about favorite trees.")
first_element = Element.create(title: 'Question 1', form_id: first_form.id, body: "What is your favorite tree?", order: 1, element_type: "Multiple Choice")
first_option = Option.create(title: 'A', element_id: first_element.id, body: "The Larch", order: 1, option_type: "Multiple Choice")
second_option = Option.create(title: 'B', element_id: first_element.id, body: "The Birch", order: 2, option_type: "Multiple Choice")
second_form = Form.create(name: 'Energy Survey', user_id: first_user.id, description: "This survey collects information about perceptions of energy consumption.")
second_element = Element.create(title: 'Question 1', form_id: second_form.id, body: "What consumes more energy in your home?", order: 1, element_type: "Multiple Choice")
third_option = Option.create(title: 'A', element_id: second_element.id, body: "Lighting", order: 1, option_type: "Multiple Choice")
fourth_option = Option.create(title: 'B', element_id: second_element.id, body: "Heating", order: 2, option_type: "Multiple Choice")

third_user = User.create(username: 'demo-user', email: 'demo@aa.net', password: '123456')
third_form = Form.create(name: 'EV Driver Satisfaction Survey', user_id: third_user.id, description: "This survey collects information about user experience and satisfaction with electric vehicles.")
third_element = Element.create(title: 'Question 1', form_id: third_form.id, body: "How do you feel about the range of your vehicle?", order: 1, element_type: "Multiple Choice")
fifth_option = Option.create(title: 'A', element_id: third_element.id, body: "Range is sufficient", order: 1, option_type: "Multiple Choice")
sixth_option = Option.create(title: 'B', element_id: third_element.id, body: "Range is insufficient", order: 2, option_type: "Multiple Choice")


