import { router } from './router';
import { buildEvent } from './build-event';

let configs = [];

const register = (func, config) => {
  let configToAdd = Object.assign({}, config);
  configToAdd.handler = func;

  configs.push(configToAdd);
};

const handle = (call, context, callback) => {
  router(configs, buildEvent(call))
    .then(res => callback(res))
    .catch(res => callback(res));
};

export { register, handle };
export default handle;