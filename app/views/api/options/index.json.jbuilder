@options.each do |option|
    json.set! option.id do
        json.extract! option, :id, :element_id, :title, :body, :order, :option_type
        json.response_ids option.responses.pluck(:id)
    end
end