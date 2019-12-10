import { RECEIVE_OPTIONS, RECEIVE_OPTION, CLEAR_OPTIONS } from "../actions/option_actions";

export default function(state = {}, action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_OPTIONS:
      return Object.assign({}, state, action.options);
    case RECEIVE_OPTION:
      return Object.assign({}, state, { [action.option.id]: action.option });
    case CLEAR_OPTIONS:
      return {};
    default:
      return state;
  }
}