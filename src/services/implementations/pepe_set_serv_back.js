module.exports = function serviceFactory(configuration) {

  function getUserAuthMethod() {
    console.log('getUserAuthMethod from dev implementation');
  }

  // This object implements the bridge interface:
  // interface: {
  //   getUserAuthMethod: function(){}
  //   getGoogleSoftAuth: function(){}  
  // }
  return {
    getUserAuthMethod
  }
}