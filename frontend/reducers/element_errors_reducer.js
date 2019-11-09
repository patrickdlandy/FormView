import { RECEIVE_ELEMENT_ERRORS, CLEAR_ELEMENT_ERRORS } from '../actions/element_actions';

const elementErrorsReducer = function(state = [], action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ELEMENT_ERRORS:
      return action.errors;
    case CLEAR_ELEMENT_ERRORS:
      return [];
    default:
      return state;
  }
}

export default elementErrorsReducer;