export const fetchForm = function(id) {
    return $.ajax({
        method: 'GET',
        url: `api/forms/${id}`
    })
}

export const fetchForms = function() {
    return $.ajax({
        method: 'GET',
        url: `api/forms`
    })
}

export const createForm = function(form) {
    return $.ajax({
        method: 'POST',
        url: `api/forms`,
        data: form
    })
}