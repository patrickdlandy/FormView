import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const receiveCurrentUser = function(user) {
  return({
    type: RECEIVE_CURRENT_USER,
    user: user
  });
}

export const logoutCurrentUser = function() {
  return({
    type: LOGOUT_CURRENT_USER
  });
};

export const receiveErrors = function(errors) {
  return({
    type: RECEIVE_SESSION_ERRORS,
    errors: errors
  })
}

//THUNKS

export const login = function(user) {
  return function(dispatch) {
    return SessionApiUtil.login(user).then(
      function(payload) {
        dispatch(receiveCurrentUser(payload));
      }
    );
  }
}

export const logout = function() {
  return function(dispatch) {
    return SessionApiUtil.logout().then(
      function() {
        dispatch(logoutCurrentUser());
      }
    );
  }
}

export const signup = function(user) {
  return function(dispatch) {
    return SessionApiUtil.signup(user).then(
      function(payload) {
        dispatch(receiveCurrentUser(payload));
      }
    );
  }
}