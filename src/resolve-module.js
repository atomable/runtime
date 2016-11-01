/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict';

import { Maybe } from 'liftjs';
import { Result } from './result';

export const resolveModule = (method, event, basePath) => {
  try {
    return Maybe(method)
      .map(method => require(basePath + method.module))
      .else(Result({ status: 404, message: 'module not found' }))
      .bind(module => (params) => module(...params));
  } catch (err) {
    return Result(method ? { status: 500, message: 'unknown error occured' } : { status: 404, message: 'not found' });
  }
};