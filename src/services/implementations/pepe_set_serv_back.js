module.exports = function serviceFactory(configuration) {

  function fetch() {
    console.log('fetch from dev implementation');
  }

  // This object implements the bridge interface:
  // interface: {
  //   fetch: function(){}
  //   getUserAuthMethod: function(){}
  // }
  return {
    fetch: fetch
  }
}