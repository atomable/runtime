/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildModuleParameters = undefined;

var _liftjs = require('liftjs');

var _result = require('./result');

var buildModuleParameters = exports.buildModuleParameters = function buildModuleParameters(route, event) {
  return (0, _liftjs.Maybe)(route).map(function (route) {
    return route.parameters;
  }).map(function (parameters) {
    return parameters.map(function (routeParam) {
      return routeParam.name === '*' ? (0, _liftjs.Maybe)(event.params[routeParam.in]).or({}) : (0, _liftjs.Maybe)(event.params[routeParam.in]).map(function (x) {
        return x[routeParam.name];
      }).or({});
    });
  }).map(function (parameters) {
    return { route: route, params: parameters };
  }).or({ route: route, params: [] });
};