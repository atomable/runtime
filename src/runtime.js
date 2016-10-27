/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict';

import { router } from './router';
import { buildEvent } from './buildEvent';

module.exports.main = (call, context, callback) => {
  const basePath = process.cwd() + '\\src\\';
  router(require(basePath + 'atomable.json'), buildEvent(call), basePath)
    .then(res => callback(null, res))
    .catch(res => callback(null, res));
};

