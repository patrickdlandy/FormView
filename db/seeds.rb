# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username: 'marvin', email: 'm@endofworld', password: '123456')
Form.create(name: 'Tree Survey', user_id: 1, description: "This survey collects information about favorite trees.")
Element.create(title: 'Question 1', form_id: 1, body: "What is your favorite tree?", order: 1, element_type: "Multiple Choice")