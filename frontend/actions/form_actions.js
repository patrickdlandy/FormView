import * as FormApiUtil from '../util/form_api_util';

export const RECEIVE_FORMS = "RECEIVE_FORMS";
export const RECEIVE_FORM = "RECEIVE_FORM";
export const CLEAR_FORMS = "CLEAR_FORMS";
export const RECEIVE_FORM_ERRORS = "RECEIVE_FORM_ERRORS";
export const CLEAR_FORM_ERRORS = "CLEAR_FORM_ERRORS";


export const receiveForm = function(form) {
    return({
        type: RECEIVE_FORM,
        form: form
    })
}

export const receiveForms = function(forms) {
    return({
        type: RECEIVE_FORMS,
        forms: forms
    })
}

export const clearForms = function() {
    return({
        type: CLEAR_FORMS,
    })
}

export const receiveFormErrors = function(errors) {
    return({
        type: RECEIVE_FORM_ERRORS,
        errors: errors
    })
}

export const clearFormErrors = function() {
    return ({
        type: CLEAR_FORM_ERRORS
    })
}

//THUNKS

export const fetchForms = function() {
    return function(dispatch) {
        return FormApiUtil.fetchForms().then(
            function(payload) {
                dispatch(receiveForms(payload));
            },
            function(err) {
                dispatch(receiveFormErrors(err.responseJSON))
            }
        );
    }
}

export const fetchForm = function(id) {
    return function(dispatch) {
        return FormApiUtil.fetchForm(id).then(
            function (payload) {
                dispatch(receiveForm(payload));
            },
            function (err) {
                dispatch(receiveFormErrors(err.responseJSON))
            }
        );
    }
}

export const createForm = function(form) {
    return function(dispatch) {
        return FormApiUtil.createForm(form).then(
            function (payload) {
                dispatch(receiveForm(payload));
            },
            function (err) {
                dispatch(receiveFormErrors(err.responseJSON))
            }
        );
    }
}

export const updateForm = function(form) {
    return function(dispatch) {
        return FormApiUtil.updateForm(form).then(
            function (payload) {
                dispatch(receiveForm(payload));
            },
            function (err) {
                dispatch(receiveFormErrors(err.responseJSON))
            }
        );
    }
}

export const deleteForm = function (id) {
    return function (dispatch) {
        return FormApiUtil.deleteForm(id).then(
            function () {
                dispatch(clearForms());
            },
            function (err) {
                dispatch(receiveFormErrors(err.responseJSON))
            }
        );
    }
}
