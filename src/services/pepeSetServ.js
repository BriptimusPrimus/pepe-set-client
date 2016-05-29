export default function(configuration) {
  var service = require('./' + configuration.backend_implementation.module + '.js');
  return service(configuration);
}