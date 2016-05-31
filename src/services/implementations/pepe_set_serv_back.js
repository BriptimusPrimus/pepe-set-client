module.exports = function serviceFactory(configuration) {

  const apiEndpoint = configuration.backend_implementation.api.protocol + '://'
    + configuration.backend_implementation.api.host + ':'
    + configuration.backend_implementation.api.port + '/'
    + configuration.backend_implementation.api.root + '/';

  function getRequest(endpoint) {
    function makeRequest(resolve, reject) {
      const requestConf = {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }

      fetch(endpoint, requestConf)
        .then(function(response) {
          console.log('SERVER RESPONSE:', response);
          if (response.status !== 200) {
            return {
              error: 'Service Failure',
              status: response.status
            }
          }
          return response.json();
        })
        .then(function(data) {
          console.log('SERVER RESPONSE DATA:', data);
          if(data.error) {
            reject(data);
          } else {
            resolve(data);
          }
        })
        .catch(function(reason) {
          reject({
            error: 'Service Failure'
          });
        });
    }

    return new Promise(function(resolve, reject) {
      makeRequest(resolve, reject);
    });
  }

  function postRequest(endpoint, data) {
    function makeRequest(resolve, reject) {
      const requestConf = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
      }

      fetch(endpoint, requestConf)
        .then(function(response) {
          if (response.status !== 200) {
            return {
              error: 'Service Failure',
              status: response.status
            }
          }
          return response.json();
        })
        .then(function(data) {
          if(data.error) {
            reject(data);
          } else {
            resolve(data);
          }
        })
        .catch(function(reason) {
          reject({
            error: 'Service Failure'
          });
        });
    }

    return new Promise(function(resolve, reject) {
      makeRequest(resolve, reject);
    });

  }

  function getUserAuthMethod() {
    console.log('getUserAuthMethod from dev implementation');
    const endpoint = apiEndpoint
      + configuration.backend_implementation.api.auth_method;
    return getRequest(endpoint);
  }

  function getGoogleSoftAuth() {
    console.log('getGoogleSoftAuth from dev implementation');
    const endpoint = apiEndpoint
      + configuration.backend_implementation.api.enroll_google_soft;
    return getRequest(endpoint);
  }

  function postActivateGoogleAuth(otpCode) {
    console.log('postActivateGoogleAuth from dev implementation');
    const endpoint = apiEndpoint
      + configuration.backend_implementation.api.activate_google_auth;
    return postRequest(endpoint, {otp: otpCode});
  }

  function postAuthenticateGoogleAuth(otpCode) {
    console.log('postAuthenticateGoogleAuth from dev implementation');
    const endpoint = apiEndpoint
      + configuration.backend_implementation.api.login_google_auth;
    return postRequest(endpoint, {otp: otpCode});
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
