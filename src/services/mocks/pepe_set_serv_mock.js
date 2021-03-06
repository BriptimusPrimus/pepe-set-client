import {getSessionToken} from '../../lib/utils';

module.exports = function serviceFactory(configuration) {

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
            is2fa: true,
            isFullyLoggedIn: false,
            authData: {
              nonce: 1,
              id: 123,
              secret: 'secret',
              uri: '/some/uri'
            }
          }
        }
      } else if (session_token === 'type_u2f') {
        return {
          userData: {
            type: 'u2f',
            is2fa: true,
            isFullyLoggedIn: false,
            authData: {
              nonce: 2,
              id: 456,
              secret: 'secret',
              uri: '/some/uri'
            }
          }
        }
      } else if (session_token === 'type_unknown') {
        return {
          userData: {
            type: 'unknown',
            is2fa: true,
            isFullyLoggedIn: false
          }
        }
      } else if (session_token === 'loggedin_google_auth') {
        return {
          userData: {
            type: 'google_auth',
            is2fa: true,
            isFullyLoggedIn: true
          }
        }
      } else if (session_token === 'loggedin_u2f') {
        return {
          userData: {
            type: 'u2f',
            is2fa: true,
            isFullyLoggedIn: true
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
      }, configuration.mockResponseMiliseconds);
    });
  }
  
  function getGoogleSoftAuth() {
    console.log('mock request to getGoogleSoftAuth');

    function mockRequest() {
      const session_token = getSessionToken();
      console.log('mock response from getGoogleSoftAuth, ', 'sessionToken =', session_token);

      if (session_token === 'type_basic') {
        return {
          activationData: {
            nonce: 23,
            id: 999,
            secret: 'secret',
            uri: '/some/uri',
            type: 'google_auth'
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
      }, configuration.mockResponseMiliseconds);
    });    
  }
  
  function postActivateGoogleAuth(otpCode) {
    console.log('mock request to postActivateGoogleAuth');
    
    function mockRequest() {
      console.log('mock response from postActivateGoogleAuth, ', 'otpCode =', otpCode);
      
      if(otpCode === '000000') {
        return {
          userData: {
            type: 'google_auth',
            is2fa: true,
            isFullyLoggedIn: true
          }          
        } 
      } else {
        return {
          error: 'Invalid OTP Code'  
        }
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
      }, configuration.mockResponseMiliseconds);
    });      
  }
  
  function postAuthenticateGoogleAuth(otpCode) {
    console.log('mock request to postAuthenticateGoogleAuth');
    
    function mockRequest() {
      if(otpCode === '111111') {
        return {
          userData: {
            type: 'google_auth',
            is2fa: true,
            isFullyLoggedIn: true
          }          
        } 
      } else {
        return {
          error: 'Invalid OTP Code'  
        }
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
      }, configuration.mockResponseMiliseconds);
    });      
  }

  // This object implements the bridge interface:
  // interface: {
  //   getUserAuthMethod: function(){}
  //   getGoogleSoftAuth: function(){}
  //   postActivateGoogleAuth: function(otpCode){}
  //   postAuthenticateGoogleAuth: function(otpCode){}
  // }
  return {
    getUserAuthMethod,
    getGoogleSoftAuth,
    postActivateGoogleAuth,
    postAuthenticateGoogleAuth
  }
}