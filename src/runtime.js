import { router } from './router';
import { buildEvent } from './build-event';
import { findConfigFiles } from './find-config-files';
import { extractConfig } from './extract-config';
import { mergeConfigs } from './merge-configs';
import { Result } from './result';

let configs = [];

const register = (func, config) => {
  let configToAdd = Object.assign({}, config);
  configToAdd.handler = func;

  configs.push(configToAdd);
};

const handle = (call, context, callback) => {
  router(configs, buildEvent(call))
    .then(res => callback(null, res))
    .catch(res => callback(null, res));
};

export { register, handle };
export default handle;