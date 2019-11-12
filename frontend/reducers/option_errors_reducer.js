import { RECEIVE_OPTION_ERRORS, CLEAR_OPTION_ERRORS } from "../actions/option_actions"

const optionErrorsReducer = function(state = [], action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_OPTION_ERRORS:
      return action.errors;
    case CLEAR_OPTION_ERRORS:
      return [];
    default:
      return state;
  }
}

export default optionErrorsReducer;