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

export const updateOption = function(option) {
  return $.ajax({
    method: 'PATCH',
    url: `api/options/${option.id}`,
    data: option
  })
}

export const deleteOption =  function(option) {
  return $.ajax({
    method: 'DELETE',
    url: `api/options/${option.id}`
  })
}