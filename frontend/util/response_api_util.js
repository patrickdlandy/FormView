export const fetchResponses = function() {
  return $.ajax({
    method: 'GET',
    url: `api/responses`
  })
}

export const createResponse = function(response) {
  return $.ajax({
    method: 'POST',
    url: `api/responses`,
    data: response
  })
}