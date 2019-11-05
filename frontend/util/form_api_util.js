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

export const updateForm = function(form) {
    return $.ajax({
        method: 'PATCH',
        url: `api/forms/${form.id}`,
        data: form
    })
}