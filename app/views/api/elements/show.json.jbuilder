json.extract! @element, :id, :form_id, :title, :body, :order, :element_type
json.option_ids @element.options.pluck(:id)
