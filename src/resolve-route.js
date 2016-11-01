/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict';

import { Maybe } from 'liftjs';
import { Result } from './result';

const extractProperty = (obj, propName) => {
  const matchingKeys = Object.keys(obj).filter(prop => prop.toLowerCase() === propName.toLowerCase());
  return matchingKeys.length === 1 ? obj[matchingKeys[0]] : null;
};

export const resolveRoute = (config, event) => {
  return Maybe(extractProperty(config, event.path))
    .map(path => extractProperty(path, event.method))
    .or({ status: 404, message: 'not found' });
};