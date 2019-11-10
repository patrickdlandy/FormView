@forms.each do |form|
    json.set! form.id do
        json.extract! form, :id, :name, :user_id, :description
        json.element_ids form.elements.pluck(:id)
    end
end