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
    console.log("AJAX REQUEST");
    console.log(form);
    //We are getting up to this point without a problem. Apparently form.id is undefined when the request hits the back end.
    //The form argument does not have an id!!!!!!!
    return $.ajax({
        method: 'PATCH',
        url: `api/forms/${form.id}`,
        data: form
    })
}