import { RECEIVE_FORM, RECEIVE_FORMS } from "../actions/form_actions";

export default function(state = {}, action) {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_FORMS:
            return Object.assign({}, state, action.forms);
        case RECEIVE_FORM:
            return Object.assign({}, state, { [action.form.id]: action.form });
        default:
            return state;
    }
}