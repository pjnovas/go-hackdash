/**
 * Expose the configuration. Uses the test config if NODE_ENV env setting
 * is set as 'test'. Otherwise it uses the default config file
 */

import config from './config.json';
//import testConfig from './config.test.json';

let configs = config;

if(process.env.NODE_ENV === 'test') {
  configs = testConfig;
}

export default configs;
