export default function(configuration) {
  const service = require('./' + configuration.backend_implementation.module + '.js');
  return service;
}