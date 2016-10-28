/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveRoute = undefined;

var _liftjs = require('liftjs');

var _result = require('./result');

var extractProperty = function extractProperty(obj, propName) {
  var matchingKeys = Object.keys(obj).filter(function (prop) {
    return prop.toLowerCase() === propName.toLowerCase();
  });
  return matchingKeys.length === 1 ? obj[matchingKeys[0]] : null;
};

var resolveRoute = exports.resolveRoute = function resolveRoute(config, event) {
  return (0, _liftjs.Maybe)(extractProperty(config, event.path)).map(function (path) {
    return extractProperty(path, event.method);
  }).or({ status: 404, message: 'not found' });
};