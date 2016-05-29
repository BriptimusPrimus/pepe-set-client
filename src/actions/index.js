/*
 * action types
 */

// initial
export const REQUEST_USER_DATA = 'REQUEST_USER_DATA';
export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA';
// google authenticator
export const SET_AUTHENTICATION_METHOD = 'SET_AUTHENTICATION_METHOD';
export const RECEIVE_ACTIVATION_DATA = 'RECEIVE_ACTIVATION_DATA';
export const ACTIVATE_GOOGLE_AUTH = 'ACTIVATE_GOOGLE_AUTH';
export const ACTIVATE_GOOGLE_AUTH_SUCCESS = 'ACTIVATE_GOOGLE_AUTH_SUCCESS';
export const ACTIVATE_GOOGLE_AUTH_ERROR = 'ACTIVATE_GOOGLE_AUTH_ERROR';
// TODO: U2F here


/*
 * action creators
 */

export function requestUserData() {
  return {
    type: REQUEST_USER_DATA
  }
}

export function receiveUserData(userData) {
  return {
    type: RECEIVE_USER_DATA,
    userData
  }
}

export function setAuthenticationMethod(method) {
  return {
    type: SET_AUTHENTICATION_METHOD,
    method
  }
}

export function receiveActivationData(activationData) {
  return {
    type: RECEIVE_ACTIVATION_DATA,
    activationData
  }
}

export function activateGoogleAuth() {
  return {
    type: ACTIVATE_GOOGLE_AUTH
  }
}

export function activateGoogleAuthSuccess(userData) {
  return {
    type: ACTIVATE_GOOGLE_AUTH_SUCCESS,
    userData
  }
}

export function activateGoogleAuthError(error) {
  return {
    type: ACTIVATE_GOOGLE_AUTH_ERROR,
    error
  }
}