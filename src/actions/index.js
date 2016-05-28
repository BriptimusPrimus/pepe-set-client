/*
 * action types
 */

export const REQUEST_USER_DATA = 'REQUEST_USER_DATA';
export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA';
export const SET_AUTHENTICATION_METHOD = 'SET_AUTHENTICATION_METHOD';

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
    meth
  }
}