/* jshint -W097, esversion: 6, strict: true, node: true */
/* global module */
'use strict';

var _router = require('./router');

var _buildEvent = require('./buildEvent');

module.exports.main = function (call, context, callback) {
  var basePath = process.cwd() + '\\src\\';
  (0, _router.router)(require(basePath + 'atomable.json'), (0, _buildEvent.buildEvent)(call), basePath).then(function (res) {
    return callback(null, res);
  }).catch(function (res) {
    return callback(null, res);
  });
};