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

      // uncomment to test currencyConversion API http://localhost:3333/symbols
      // or http://localhost:3000/hackauth/user_auth_server_method
      // fetch('http://localhost:3333/symbols', requestConf)
      //   .then(function(response) {
      //     console.log('TEST GET REQUEST 0');
      //     // if (response.status !== 200) {
      //     //   return {
      //     //     error: 'Service Failure XXX',
      //     //     status: response.status
      //     //   }
      //     // }
      //     console.log('currencyConversion response:', response);
      //     console.log('TEST GET REQUEST 1');
      //     return response.json();
      //   })
      //   .then(function(data) {
      //     console.log('TEST GET REQUEST 2');
      //     console.log('currencyConversion data:', JSON.stringify(data));
      //     alert(JSON.stringify(data));
      //     if(data.error) {
      //       reject(data);
      //     } else {
      //       resolve(data);
      //     }
      //   })
      //   .catch(function(reason) {
      //     reject({
      //       error: 'Service Failure XXX'
      //     });
      //   });

    }

    return new Promise(function(resolve, reject) {
      makeRequest(resolve, reject);
    });
  }

  function postRequest(enpoint, data) {
    function makeRequest(resolve, reject) {
      const requestConf = {
        method: 'POST',
        mode: 'cors',
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

  function postActivateGoogleAuth() {
    console.log('postActivateGoogleAuth from dev implementation');
    const endpoint = apiEndpoint
      + configuration.backend_implementation.api.activate_google_auth;
    return postRequest(endpoint);
  }

  function postAuthenticateGoogleAuth() {
    console.log('postAuthenticateGoogleAuth from dev implementation');
    const endpoint = apiEndpoint
      + configuration.backend_implementation.api.login_google_auth;
    return postRequest(endpoint);
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
