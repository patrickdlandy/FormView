import * as OptionApiUtil from '../util/option_api_util';

export const RECEIVE_OPTION = "RECEIVE_OPTION";
export const RECEIVE_OPTIONS = "RECEIVE_OPTIONS";
export const CLEAR_OPTIONS = "CLEAR_OPTIONS";
export const RECEIVE_OPTION_ERRORS = "RECEIVE_OPTION_ERRORS";
export const CLEAR_OPTION_ERRORS = "CLEAR_ELEMENT_ERRORS";

export const receiveOptions = function(options) {
  return({
    type: RECEIVE_OPTIONS,
    options: options
  })
}

export const clearOptions = function() {
  return({
    type: CLEAR_OPTIONS
  })
}

export const receiveOptionErrors = function(errors) {
  return({
    type: RECEIVE_OPTION_ERRORS,
    errors: errors
  })
}

export const clearOptionErrors = function(errors) {
  return({
    type: CLEAR_OPTION_ERRORS
  })
}
//THUNKS

export const fetchOptions = function() {
  return function(dispatch) {
    return OptionApiUtil.fetchOptions().then(
      function(payload) {
        dispatch(receiveOptions(payload));
      },
      function(err) {
        dispatch(receiveOptionErrors(err.responseJSON));
      }
    );
  }
}