import * as FormApiUtil from '../util/form_api_util';

export const RECEIVE_FORMS = "RECEIVE_FORMS";
export const RECEIVE_FORM = "RECEIVE_FORM";

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

//THUNKS

export const fetchForms = function() {
    return function(dispatch) {
        return FormApiUtil.fetchForms().then(
            function(payload) {
                dispatch(receiveForms(payload));
            }
        );
    }
}

export const fetchForm = function(id) {
    return function (dispatch) {
        return FormApiUtil.fetchForm(id).then(
            function (payload) {
                dispatch(receiveForm(payload));
            }
        );
    }
}