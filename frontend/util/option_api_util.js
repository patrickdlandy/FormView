export const fetchOptions = function() {
  return $.ajax({
    method: 'GET',
    url: `api/options`
  })
}