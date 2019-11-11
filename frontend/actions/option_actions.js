import * as OptionApiUtil from '../util/element_api_util';

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

//THUNKS

export const fetchOptions = function() {
  return function(dispatch) {
    return ElementApiUtil.fetchOptions().then(
      function(payload) {
        dispatch(receiveOptions(payload));
      },
      function(err) {
        dispatch(receiveOptions(err.responseJSON));
      }
    );
  }
}