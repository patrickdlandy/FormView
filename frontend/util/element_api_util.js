export const fetchElement = function(id) {
    return $.ajax({
        method: 'GET',
        url: `api/elements/${id}`
    })
}

export const fetchElements = function() {
    return $.ajax({
        method: 'GET',
        url: `api/elements`
    })
}

