@elements.each do |element|
    json.set! element.id do
        json.extract! element, :id, :form_id, :title, :body, :order
        json.option_ids element.options.pluck(:id)
    end
end