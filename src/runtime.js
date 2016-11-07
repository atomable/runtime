import { router } from './router';
import { buildEvent } from './build-event';

let configs = [];

const register = (func, config) => {
  let configToAdd = Object.assign({}, config);
  configToAdd.handler = (...args) => {
    console.log(`Executing ${config.name}. for '${config.https.path}' path`);
    return func(...args);
  };

  configs.push(configToAdd);
};

const handle = (call, context, callback) => {
  router(configs, buildEvent(call))
    .then(res => callback(null, res))
    .catch(res => callback(null, res));
};

export { register, handle };
export default handle;