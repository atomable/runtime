/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Result = undefined;

var _liftjs = require('liftjs');

var isNone = function isNone(value) {
  return value === null || value === undefined;
};

var Result = exports.Result = (0, _liftjs.Monad)(function (monad, value) {
  var resultHasStatus = !isNone(value) && value.status !== undefined;
  monad.bind = resultHasStatus ? function () {
    return monad;
  } : monad.bind;
  monad.map = resultHasStatus ? function () {
    return monad;
  } : monad.map;
  var run = monad.run;
  monad.run = function (func) {
    (resultHasStatus ? function () {} : run)(value, func);return monad;
  };
});