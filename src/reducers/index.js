import {
  REQUEST_USER_DATA,
  RECEIVE_USER_DATA,
  SET_AUTHENTICATION_METHOD
} from './actions';

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
  waitingForResponse: false
}

function waitingForResponse(state=false, action) {
  switch(action.type) {
    case REQUEST_USER_DATA:
    case SET_AUTHENTICATION_METHOD:
      return true
    case RECEIVE_USER_DATA:
      return false
    default:
      return state
  }
}

function userData(state={}, action) {
  switch (action.type) {
    case RECEIVE_USER_DATA:
      return action.userData
    default:
      return state
  }
}

function activationData(state={}, action) {
  switch (action.type){
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