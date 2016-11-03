'use strict';

import { router } from './router';
import { buildEvent } from './build-event';

module.exports.main = (call, context, callback) => {
  const basePath =  './project/';
  router('', buildEvent(call), basePath)
    .then(res => callback(null, res))
    .catch(res => callback(null, res));
};

