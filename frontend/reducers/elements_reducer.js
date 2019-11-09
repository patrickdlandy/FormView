import { RECEIVE_ELEMENT, RECEIVE_ELEMENTS, CLEAR_ELEMENTS } from "../actions/element_actions";

export default function(state = {}, action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ELEMENTS:
      return Object.assign({}, state, action.elements);
    case RECEIVE_ELEMENT:
      return Object.assign({}, state, { [action.element.id]: action.element });
    case CLEAR_ELEMENTS:
      return {};
    default:
      return state;
  }
}