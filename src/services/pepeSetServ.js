export default function(configuration) {
  const service = require('./' + configuration.backend_implementation.module + '.js');
  console.log('SERVICE FETCH:', service.fetch());
  return service;
}