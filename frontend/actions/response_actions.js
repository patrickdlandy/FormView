import * as ResponseApiUtil from '../util/response_api_util';

export const RECEIVE_RESPONSES = "RECEIVE_RESPONSES";
export const RECEIVE_RESPONSE = "RECEIVE_RESPONSE";
export const CLEAR_RESPONSES = "CLEAR_RESPONSES";
export const RECEIVE_RESPONSE_ERRORS = "RECEIVE_RESPONSE_ERRORS";
export const CLEAR_RESPONSE_ERRORS = "CLEAR_RESPONSE_ERRORS";

export const receiveResponse = function(response) {
  return({
    type: RECEIVE_RESPONSE,
    response: response
  })
}

export const receiveResponses = function (responses) {
  console.log('action');
  return ({
    type: RECEIVE_RESPONSES,
    responses: responses
  })
}

export const clearResponses = function() {
  return({
    type: CLEAR_RESPONSES
  })
}

export const receiveResponseErrors = function(errors) {
  return({
    type: RECEIVE_RESPONSE_ERRORS,
    errors: errors
  })
}

export const clearResponseErrors = function() {
  return({
    type: CLEAR_RESPONSE_ERRORS
  })
}

//THUNKS

export const fetchResponses = function() {
  return function(dispatch) {
    return ResponseApiUtil.fetchResponses().then(
      function(payload) {
        dispatch(receiveResponses(payload));
      },
      function(err) {
        dispatch(receiveResponseErrors(err.responseJSON))
      }
    )
  }
}

export const createResponse = function(response) {
  return function(dispatch) {
    return ResponseApiUtil.createResponse(response).then(
      function(payload) {
        dispatch(receiveResponse(payload));
      },
      function(err) {
        dispatch(receiveResponseErrors(err.responseJSON));
      }
    );
  }
}