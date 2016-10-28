/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _liftjs = require('liftjs');

var _result = require('./result');

var _resolveModule = require('./resolveModule');

var _resolveRoute = require('./resolveRoute');

var _validateRequiredParameters = require('./validateRequiredParameters');

var _buildModuleParameters = require('./buildModuleParameters');

var _handleExecutionResult = require('./handleExecutionResult');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = exports.router = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(config, event, basePath) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', (0, _result.Result)((0, _resolveRoute.resolveRoute)(config, event)).map(function (route) {
              return (0, _validateRequiredParameters.validateRequiredParameters)(route, event);
            }).map(function (route) {
              return (0, _buildModuleParameters.buildModuleParameters)(route, event);
            }).map(function (r) {
              return function () {
                return (0, _resolveModule.resolveModule)(r.route, event, basePath)(r.params);
              };
            }).map(function (executor) {
              return (0, _handleExecutionResult.handleExecutionResult)(executor);
            }).get());

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function router(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();