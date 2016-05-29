import {
  REQUEST_USER_DATA,
  RECEIVE_USER_DATA,
  SET_AUTHENTICATION_METHOD,
  RECEIVE_ACTIVATION_DATA,
  ACTIVATE_GOOGLE_AUTH,
  ACTIVATE_GOOGLE_AUTH_SUCCESS,
  ACTIVATE_GOOGLE_AUTH_ERROR
} from '../actions';

const stateSample = {
  waitingForResponse: false,
  userData: {
    type: 'google_auth',
    is2fa: true,
    isFullyLoggedIn: false,
    authData: {
      nonce: 1,
      id: 123,
      secret: 'secret',
      uri: '/some/uri'
    }
  },
  activationData: {
    nonce: 2,
    id: 771,
    secret: 'confidential',
    uri: 'goo/bitmap'
  }
}

const initialState = {
  waitingForResponse: false, 
  userData: {},
  activationData: {}
}

function waitingForResponse(state=false, action) {
  switch(action.type) {
    case REQUEST_USER_DATA:
      return true
    case SET_AUTHENTICATION_METHOD:
      return true
    case RECEIVE_USER_DATA:
      return false
    case RECEIVE_ACTIVATION_DATA:
      return false
    case ACTIVATE_GOOGLE_AUTH:
      return true
    case ACTIVATE_GOOGLE_AUTH_SUCCESS:
      return false
    case ACTIVATE_GOOGLE_AUTH_ERROR:
      return false
    default:
      return state
  }
}

function userData(state={}, action) {
  switch (action.type) {
    case RECEIVE_USER_DATA:
      return action.userData
    case ACTIVATE_GOOGLE_AUTH_SUCCESS:
      return action.userData
    case ACTIVATE_GOOGLE_AUTH_ERROR:
      return Object.assign({}, state, {
        errorNotification: action.error.error
      })
    default:
      return state
  }
}

function activationData(state={}, action) {
  switch (action.type){
    case RECEIVE_ACTIVATION_DATA:
      return action.activationData
    case ACTIVATE_GOOGLE_AUTH_SUCCESS:
      return {}
    case ACTIVATE_GOOGLE_AUTH_ERROR:
      return state
    default:
      return state
  }
}

export default function reducer(state = initialState, action) {
  return {
    waitingForResponse: waitingForResponse(state.waitingForResponse, action),
    userData: userData(state.userData, action),
    activationData: activationData(state.activationData, action)
  }
}