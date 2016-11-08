import { router } from './router';
import { buildEvent, normalize } from './build-event';

const configs = [];

const end = (error, res, callback) => {
  console.log('ATOMABLE END', res);
  callback(error, res);
}

const register = (func, config) => {
  let configToAdd = Object.assign({}, config);

  configToAdd.handler = (...args) => {
    console.log('ATOMABLE EXECUTING', JSON.stringify({ name: configToAdd.name, path: configToAdd.https.path }, null, ' '));
    return func(...args);
  };

  if (configToAdd.https) {
    configToAdd.https.path = normalize(configToAdd.https.path);
    configToAdd.https.method = normalize(configToAdd.https.method);
  }

  configs.push(configToAdd);
};

const handle = (call, context, callback) => {
  console.log('ATOMABLE START', JSON.stringify(call, null, ' '), JSON.stringify(context, null, ' '));
  if (configs && configs.length > 0) {
    router(configs, buildEvent(call))
      .then(res => end(null, res, callback))
      .catch(res => end(null, res, callback));
  } else {
    end(null, { statusCode: 404, body: 'no routes are configured' }, callback);
  }
};

export { register, handle };
export default handle;