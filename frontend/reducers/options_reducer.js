import { RECEIVE_OPTIONS, CLEAR_OPTIONS } from "../actions/option_actions";

export default function(state = {}, action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_OPTIONS:
      return Object.assign({}, state, action.options);
    case CLEAR_OPTIONS:
      return {};
    default:
      return state;
  }
}