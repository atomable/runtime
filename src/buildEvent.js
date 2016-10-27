/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict'

import { prepareHeaders } from './prepareHeaders';

export const buildEvent = (call) => {
  return {
    path: call.headers['x-at-path'],
    method: call.method,
    params: {
      body: call.body,
      headers: prepareHeaders(call.headers),
      query: call.query
    }
  };
};