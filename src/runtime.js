import { router } from './router';
import { buildEvent } from './build-event';
import { findConfigFiles } from './find-config-files';
import { extractConfig } from './extract-config';
import { mergeConfigs } from './merge-configs';
import { Result } from './result';

let configs = [];

module.exports.main = (call, context, callback) => {
  router(configs, buildEvent(call))
    .then(res => callback(null, res))
    .catch(res => callback(null, res));
};

