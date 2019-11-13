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

export const createElement = function(element) {
    return $.ajax({
        method: 'POST',
        url: `api/elements`,
        data: element
    })
}

