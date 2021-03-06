import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER
} from '../actions/session_actions';

// const _nullSession = {
//   currentUser: null,
// };

const _nullUser = {
  id: null
};



const sessionReducer = function(state = _nullUser, action){
  // debugger
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      // debugger
      return { id: action.user.id };
    case LOGOUT_CURRENT_USER:
      return _nullUser;
    default:
      return state;
  }
}

export default sessionReducer;

