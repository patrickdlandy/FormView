import { RECEIVE_RESPONSE_ERRORS, CLEAR_RESPONSE_ERRORS } from "../actions/response_actions";

const responseErrorsReducer = function(state = [], action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RESPONSE_ERRORS:
      return action.errors;
    case CLEAR_RESPONSE_ERRORS:
      return [];
    default:
      return state;
  }
}

export default responseErrorsReducer;