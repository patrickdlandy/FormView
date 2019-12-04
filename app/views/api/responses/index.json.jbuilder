@responses.each do |response|
  json.set! response.id do
    json.extract! response, :id, :identifier, :option_id, :created_at 
  end
end