/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveModule = undefined;

var _liftjs = require('liftjs');

var _result = require('./result');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var resolveModule = exports.resolveModule = function resolveModule(method, event, basePath) {
  try {
    return (0, _liftjs.Maybe)(method).map(function (method) {
      return require(basePath + method.module);
    }).else((0, _result.Result)({ status: 404, message: 'module not found' })).bind(function (module) {
      return function (params) {
        return module.apply(undefined, _toConsumableArray(params));
      };
    });
  } catch (err) {
    return (0, _result.Result)(method ? { status: 500, message: 'unknown error occured' } : { status: 404, message: 'not found' });
  }
};