import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_SESSION_ERRORS } from "../actions/session_actions";

const sessionErrorsReducer = function(state = {}, action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      state.errors = action.errors;
      break;
    case RECEIVE_CURRENT_USER:
      state.errors = [];
      break;
  }
}

export default sessionErrorsReducer;