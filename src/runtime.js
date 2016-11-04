import { router } from './router';
import { buildEvent } from './build-event';
import { findConfigFiles } from './find-config-files';
import { Result } from './result';

module.exports.main = (call, context, callback) => {
  const basePath = context.basePath || './project/';
  
  const config = Result(findConfigFiles(basePath))
    .map(files => files.map(extractConfig))
    .map(configs => mergeConfigs(configs))
    .map(config => router(config, buildEvent(call), basePath)) // basePath should not be passed anymore, it should come from the config.
    .get()
    .then(res => callback(null, res))
    .catch(res => callback(null, res));
};

