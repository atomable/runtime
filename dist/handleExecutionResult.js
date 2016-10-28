/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleExecutionResult = undefined;

var _result = require('./result');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-polyfill');


var isPromise = function isPromise(obj) {
  return typeof obj !== 'undefined' && typeof obj.then === 'function';
};

var buildSuccessResponse = function buildSuccessResponse(result) {
  return { status: 200, result: result };
};

var buildFailureResponse = function buildFailureResponse(err) {
  return { status: err.status || 500, message: err.message || err };
};

var handleExecutionResult = exports.handleExecutionResult = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(moduleExecutor) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            result = moduleExecutor();

            if (!isPromise(result)) {
              _context.next = 9;
              break;
            }

            _context.next = 5;
            return result;

          case 5:
            _context.t0 = _context.sent;
            return _context.abrupt('return', buildSuccessResponse(_context.t0));

          case 9:
            return _context.abrupt('return', buildSuccessResponse(result));

          case 10:
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t1 = _context['catch'](0);
            return _context.abrupt('return', buildFailureResponse(_context.t1));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 12]]);
  }));

  return function handleExecutionResult(_x) {
    return _ref.apply(this, arguments);
  };
}();