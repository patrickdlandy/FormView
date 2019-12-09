import * as OptionApiUtil from '../util/option_api_util';

export const RECEIVE_OPTION = "RECEIVE_OPTION";
export const RECEIVE_OPTIONS = "RECEIVE_OPTIONS";
export const CLEAR_OPTIONS = "CLEAR_OPTIONS";
export const RECEIVE_OPTION_ERRORS = "RECEIVE_OPTION_ERRORS";
export const CLEAR_OPTION_ERRORS = "CLEAR_OPTION_ERRORS";

export const receiveOptions = function(options) {
  return({
    type: RECEIVE_OPTIONS,
    options: options
  })
}

export const receiveOption = function (option) {
  return ({
    type: RECEIVE_OPTION,
    options: option
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

export const fetchOption = function (id) {
  return function (dispatch) {
    return OptionApiUtil.fetchOption(id).then(
      function (payload) {
        dispatch(receiveOption(payload));
      },
      function (err) {
        dispatch(receiveOptionErrors(err.responseJSON));
      }
    );
  }
}

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

export const createOption = function(option) {
  return function(dispatch) {
    return OptionApiUtil.createOption(option).then(
      function(payload) {
        dispatch(receiveOption(payload));
      },
      function(err) {
        dispatch(receiveOptionErrors(err.responseJSON));
      }
    );
  }
}

export const updateOption = function(option) {
  return function(dispatch) {
    return OptionApiUtil.updateOption(option).then(
      function(payload) {
        dispatch(receiveOption(payload));
      },
      function(err) {
        dispatch(receiveOptionErrors(err.responseJSON));
      }
    )
  }
}

export const deleteOption = function(option) {
  return function() {
    return OptionApiUtil.deleteOption(option)
  }
}