/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict';

export const buildEvent = (call) => {
  return {
    path: call.path,
    method: call.method,
    params: {
      body: call.body,
      headers: call.headers,
      query: call.query
    }
  };
};