export const fetchOptions = function() {
  return $.ajax({
    method: 'GET',
    url: `api/options`
  })
}

export const createOption = function(option) {
  return $.ajax({
    method: 'POST',
    url: `api/options`,
    data: option
  })
}