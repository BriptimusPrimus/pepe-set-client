import * as defaultConfig from './default.json';
import * as devConfig from './development.json';
import * as testConfig from './test.json';

export default function setConfig(environment) {
  const envConfig = environment === 'test' ?
    testConfig : devConfig;
  
  return Object.assign({}, defaultConfig, envConfig);
}