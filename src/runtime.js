import { router } from './router';
import { buildEvent, normalize } from './build-event';

let configs = [];

const register = (func, config) => {
  let configToAdd = Object.assign({}, config);

  configToAdd.handler = (...args) => {
    console.log(`Executing '${config.name}' for '${config.https.path}' path`);
    return func(...args);
  };

  if (configToAdd.https) {
    configToAdd.https.path = normalize(configToAdd.https.path);
    configToAdd.https.method = normalize(configToAdd.https.method);
  }

  configs.push(configToAdd);
};

const handle = (call, context, callback) => {
  if (configs && configs.length > 0) {
    router(configs, buildEvent(call))
      .then(res => callback(null, res))
      .catch(res => callback(null, res));
  } else {
    callback(null, { statusCode: 404, message: 'no routes are configured' });
  }
};

export { register, handle };
export default handle;