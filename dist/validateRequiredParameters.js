/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRequiredParameters = undefined;

var _liftjs = require('liftjs');

var _result = require('./result');

var isRequired = function isRequired(routeParam) {
  return (0, _liftjs.Maybe)(routeParam).map(function (value) {
    return value.required;
  }).or(true);
};

var isMissing = function isMissing(routeParam, event) {
  return (0, _liftjs.Maybe)(event.params[routeParam.in]).map(function (x) {
    return x[routeParam.name];
  }).map(function (x) {
    return false;
  }).or(true);
};

var validateRequiredParameters = exports.validateRequiredParameters = function validateRequiredParameters(route, event) {
  return (0, _liftjs.Maybe)(route).map(function (route) {
    return route.parameters;
  }).map(function (parameters) {
    return parameters.some(function (routeParam) {
      return routeParam.name !== '*' && isRequired(routeParam) && isMissing(routeParam, event);
    }) ? null : route;
  }).or({ status: 400, message: 'missing required parameter' });
};