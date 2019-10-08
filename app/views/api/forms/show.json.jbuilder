json.extract! @form, :id, :name, :user_id, :description
json.form_element_ids @form.elements.pluck(:id)