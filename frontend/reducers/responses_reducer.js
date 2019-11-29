import { RECEIVE_RESPONSE, RECEIVE_RESPONSES, CLEAR_RESPONSES } from "../actions/response_actions";

export default function(state = {}, action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RESPONSES:
      return Object.assign({}, state, action.responses);
    case RECEIVE_RESPONSE:
      return Object.assign({}, state,  { [action.response.id]: action.response });
    case CLEAR_RESPONSES:
      return {};
    default:
      return state;
  }
}