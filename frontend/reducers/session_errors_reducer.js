import { RECEIVE_CURRENT_USER, CLEAR_SESSION_ERRORS } from "../actions/session_actions";
import { RECEIVE_SESSION_ERRORS } from "../actions/session_actions";

const sessionErrorsReducer = function(state = [], action) {
  // debugger
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      // debugger
      return action.errors;
    case RECEIVE_CURRENT_USER:
      // debugger
      return [];
    case CLEAR_SESSION_ERRORS:
      return [];
    default:
      return state;
  }
}

export default sessionErrorsReducer;