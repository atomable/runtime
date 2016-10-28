/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildEvent = undefined;

var _prepareHeaders = require('./prepareHeaders');

var buildEvent = exports.buildEvent = function buildEvent(call) {
  return {
    path: call.headers['x-at-path'],
    method: call.method,
    params: {
      body: call.body,
      headers: (0, _prepareHeaders.prepareHeaders)(call.headers),
      query: call.query
    }
  };
};