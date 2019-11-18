import * as ElementApiUtil from '../util/element_api_util';

export const RECEIVE_ELEMENT = "RECEIVE_ELEMENT";
export const RECEIVE_ELEMENTS = "RECEIVE_ELEMENTS";
export const CLEAR_ELEMENTS = "CLEAR_ELEMENTS";
export const RECEIVE_ELEMENT_ERRORS = "RECEIVE_ELEMENT_ERRORS";
export const CLEAR_ELEMENT_ERRORS = "CLEAR_ELEMENT_ERRORS";

export const receiveElement = function(element) {
    return({
        type: RECEIVE_ELEMENT,
        element: element
    })
}

export const receiveElements = function(elements) {
    return({
        type: RECEIVE_ELEMENTS,
        elements: elements
    })
}

export const clearElements = function() {
    return({
        type: CLEAR_ELEMENTS,
    })
}

export const receiveElementErrors = function(errors) {
    return({
        type: RECEIVE_ELEMENT_ERRORS,
        errors: errors
    })
}

export const clearElementErrors = function() {
    return ({
        type: CLEAR_ELEMENT_ERRORS
    })
}

//THUNKS

export const fetchElements = function() {
    return function(dispatch) {
        return ElementApiUtil.fetchElements().then(
            function(payload) {
                dispatch(receiveElements(payload));
            },
            function(err) {
                dispatch(receiveElementErrors(err.responseJSON));
            }
        );
    }
}

export const fetchElement = function(id) {
    return function(dispatch) {
        return ElementApiUtil.fetchElement(id).then(
            function (payload) {
                dispatch(receiveElement(payload));
            },
            function (err) {
                dispatch(receiveElementErrors(err.responseJSON));
            }
        );
    }
}

export const createElement = function (element) {
    return function (dispatch) {
        return ElementApiUtil.createElement(element).then(
            function (payload) {
                dispatch(receiveElement(payload));
            },
            function (err) {
                dispatch(receiveElementErrors(err.responseJSON))
            }
        );
    }
}

export const updateElement = function (element) {
    return function (dispatch) {
        return ElementApiUtil.updateElement(element).then(
            function (payload) {
                dispatch(receiveElement(payload));
            },
            function (err) {
                dispatch(receiveElementErrors(err.responseJSON))
            }
        );
    }
}

