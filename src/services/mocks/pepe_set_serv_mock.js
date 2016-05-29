import {getSessionToken} from '../../lib/utils';

module.exports = function serviceFactory(configuration) {

  function fetch() {
    console.log('fetch from mocks');
  }

  function getUserAuthMethod() {
    console.log('mock request to getUserAuthMethod');

    function mockRequest() {
      const session_token = getSessionToken();
      console.log('mock response from getUserAuthMethod, ', 'sessionToken =', session_token);

      if (session_token === 'type_basic') {
        return {
          userData: {
            type: 'basic',
            is2fa: false,
            isFullyLoggedIn: true
          }
        }
      } else if (session_token === 'type_google_auth') {
        return {
          userData: {
            type: 'google_auth',
            is2fa: false,
            isFullyLoggedIn: false,
            authData: {
              nonce: 1,
              id: 123,
              secret: 'secret',
              uri: '/some/uri'
            }
          }
        }
      } else {
        //error case
        return {
          error: 'invalid session token'
        };
      }
    }

    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        const response = mockRequest();
        if (!response || response.error) {
          reject(response);
        } else {
          resolve(response);
        }
      }, 2000);
    });
  }

  // This object implements the bridge interface:
  // interface: {
  //   fetch: function(){}
  //   getUserAuthMethod: function(){}
  // }
  return {
    fetch,
    getUserAuthMethod
  }
}